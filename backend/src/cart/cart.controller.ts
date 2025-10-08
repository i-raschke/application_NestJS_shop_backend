import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, Patch, Post, Query, Res, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { InputPartialCartDto } from './dtos/InputPartialCart.dto';
import { RolesGuard } from '../utils/roles.guard';
import { Roles } from '../utils/roles.decorator';
import { Role } from '../utils/role.enum';
import { ObjectService } from '../object/object.service';
import { CreateUpdatePartialCartDto } from './dtos/CreateUpdatePartialCart.dto';
import { MailService } from '../mail/mail.service';


@Controller('cart')
@UseGuards(RolesGuard)
export class CartController {
	constructor(
		private readonly cartService: CartService,
		private readonly objectService: ObjectService,
    private readonly mailService: MailService

	){}

  //-pending cart: shopping cart
  //-partial cart: partial of the cart, that consists of one specific object, its amount and partial sum (amount * price)
  //-non pending cart: order, that has to be paid by the customer
  //-paid order: customer has paid the order, merchants are informed via email which objects, the amount and to which address, the merchant has to send the objects to the customer
  //-not implemented: paid order is deleted automatically after e.g. six months if no complaint is received


//Post Routes

  //Initiate shopping process by creating an empty cart for corresponding user
  @Post('shopping')
  @Roles(Role.Customer)
  async createCart(@Session() session: Record<string, any>, @Res() res){
    const customer = session.passport.user;
    try{
      const cart = await this.cartService.getPendingCart(customer.code);
      if(cart){
        return res.redirect(HttpStatus.MOVED_PERMANENTLY, `http://localhost:7331/cart/shopping/shoppingObjects`);
      }
      await this.cartService.createCart(customer);
      return res.redirect(HttpStatus.MOVED_PERMANENTLY, `http://localhost:7331/cart/shopping/shoppingObjects`);

    }catch{
      return('An error has occured');
    }

  }

  

//Get Routes

  //Just a route to let the customer know to have fun
  @Get('shopping/shoppingObjects')
  @Roles(Role.Customer)
  async shoppingArea(@Session() session: Record<string, any>){
    const customer = session.passport.user;
    return('Have fun shopping ' + customer.firstName + ' ' + customer.lastName + '!');
  }

  	

	@UseInterceptors(ClassSerializerInterceptor)
	@Get('all')
	@Roles(Role.Admin)
	async getAllCart(){
		return this.cartService.getAllCarts();
	}

  //for the customer to check the corresponding current (pending) cart
	@UseInterceptors(ClassSerializerInterceptor)
	@Get('shoppingCart')
	@Roles(Role.Customer)
	async getCurrentOrder(@Session() session: Record<string, any>){
    const user = session.passport.user;

    return this.cartService.getPendingCart(user.code);

	}



//Patch Routes

  //Updating (pending) cart, e.g. add objects, update amount
  @Patch('shopping/shoppingObjects')
	@Roles(Role.Customer)
	async updateCart(@Session() session: Record<string, any>, @Body() inputPartialCartDto: InputPartialCartDto){

    const customer = session.passport.user;     
    const object = await this.objectService.getObjectByobjectNumberWithRelationMerchant(inputPartialCartDto.objectNumber);     

    //Case the requested amount of an item is available
    if(inputPartialCartDto.quantity <= object.amount){
      const createUpdatePartialCartDto = new CreateUpdatePartialCartDto();
      createUpdatePartialCartDto.quantity = inputPartialCartDto.quantity;
      createUpdatePartialCartDto.subPrice = inputPartialCartDto.quantity * object.price;

      const cart = await this.cartService.getPendingCart(customer.code);
      
      //Case: There is already a shopping cart for customer
      if(cart){  
        const partialCart = await this.cartService.getPartialCartFromCart(cart.id, object.objectNumber);

        //Case: The requested Item is already in the shopping cart and the amount is modified
        if(partialCart){
          const newPartialCart = await this.cartService.updatePartialCart(partialCart, createUpdatePartialCartDto);

          if(newPartialCart.quantity <= object.amount){
            const newCart = await this.cartService.updateCart(cart, createUpdatePartialCartDto);

            return newCart;

          }
          else{
            createUpdatePartialCartDto.quantity *= (-1);
            createUpdatePartialCartDto.subPrice *= (-1);

            await this.cartService.updatePartialCart(newPartialCart, createUpdatePartialCartDto);
            return('Not enough of ' + object.object + ' available');
          }
        }

        //Case: The requested Item is not already in the shopping cart
        else if(!partialCart && (inputPartialCartDto.quantity > 0)){
          const newPartialCart = await this.cartService.createPartialCart(createUpdatePartialCartDto, object, cart);
          const newCart = await this.cartService.updateCartWithNewPartialCart(cart, createUpdatePartialCartDto, partialCart);

          return('Object added to cart');
        }
        else{
          return 'Invalid';
        }
        
      
      }
      else{
        return ('Try initiating shopping again');
      }

    }
    else{
      return 'Not enough objects available';
    }


  
	}





  //The current cart becomes an order -> update pending to false
	@Patch('order')
	@Roles(Role.Customer)
	async cartToOrder(@Session() session: Record<string, any>){
    const user = session.passport.user;
    const order = await this.cartService.getPendingCart(user.code);

    await this.cartService.updateCartPendingStatus(order.id);
    
    const objects = await this.cartService.getPartialCartsFromCart(order.id);

    return await this.mailService.sendOrderToCustomer(user, order, objects);

	}

  //route to update a customer's order to paid and send emails to merchants about their part of the order
	@Patch('orderPaid')
	@Roles(Role.Admin)
	async payingOrder(@Query('id') id: number){
    await this.cartService.updateCartPaidStatus(id);
    const cart = await this.cartService.getCartWithRelationCustomer(id);
    const customer = cart.customer;
    const partialCarts = await this.cartService.getPartialCartsFromCartWithRelations(id);


    //creating a list, to sort partialCarts to the corresponding merchant, to send an email to merchants with their part of the customer's order
    let listOfOrder: any[] = [];
    for(var i = 0; i < partialCarts.length; i++){
      var index = listOfOrder.indexOf(partialCarts[i].object.merchant.companyName);
      //if merchant already exists in the list, put partialCart behind merchants companyname and email (-> index + 2) 
      if(index >= 0){         
        listOfOrder.splice(index + 2, 0 ,partialCarts[i]);
      }
      else{
        //if merchant is not already listed, add merchant's companyname, email and partialCart to list
        listOfOrder.push(partialCarts[i].object.merchant.companyName);
        listOfOrder.push(partialCarts[i].object.merchant.email);
        listOfOrder.push(partialCarts[i]);
      }
    }

    //loop to send email to each merchant for their part of the customer's order
    if(listOfOrder.length > 0){
      var i = 0;
      //variable to ensure loop cannot run endlessly
      var n = 0;
      while(listOfOrder.length > 0){
        var merchantCompanyName = listOfOrder.shift();
        var merchantEmail = listOfOrder.shift();
        var merchantOrder: any[] = [];
        n++;
        //ensuring loop cannot run endlessly
        if(n >= 100){
          break;
        }
        while((typeof(listOfOrder[i]) !== ('string' || undefined)) && listOfOrder.length > 0){
          var partialCart = listOfOrder.shift();
          merchantOrder.push(partialCart);
          n++;
          //ensuring loop cannot run endlessly
          if(n >= 100){
            break;
          }
        }
        //sending the email to merchant
        this.mailService.sendOrderToMerchant(customer, merchantCompanyName, merchantEmail, merchantOrder);
      }
    }

	}

//Delete Routes

  //remove every object of a specific kind from (pending) cart
	@Delete('deleteCartItem')
	@Roles(Role.Customer)
	async deleteCartItem(@Session() session: Record<string, any>, @Body() body){
    const {objectNumber} = body;
    const user = session.passport.user;

    return this.cartService.deletePartialCart(user.code, objectNumber)      
	}

  
  //cancel the shopping proccess and delete corresponding (pending) cart
	@Delete('shopping/cancel')
	@Roles(Role.Customer)
	async deletePendingCart(@Session() session: Record<string, any>){
    const user = session.passport.user;

    return this.cartService.deletePendingCart(user.code);

	}

  @Delete('deleteOrder')
  @Roles(Role.Admin)
  async deleteOrder(@Query('id') id: number){
    return await this.cartService.deleteOrder(id);
  }


  //delete carts that are in the database for a certain amount of time
  //timeSpan in minutes, for testing purposes set to 2 minutes
  @Delete('deleteOutdatedOrders')
  @Roles(Role.Admin)
  async deleteOutdated(){
    const carts = await this.cartService.getAllCarts();
    console.log(carts);
    for(var i = 0; i < carts.length; i++){
      const timeSpan = ((new Date().getTime() - carts[i].createdAt.getTime())/60000);
      if( timeSpan >= 2){
        await this.cartService.deleteOrder(carts[i].id);
      }
      else{
        console.log(timeSpan);
      }
    }
    return;
  }

}
