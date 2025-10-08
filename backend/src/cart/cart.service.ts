import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectService } from '../object/object.service';
import { CustomerEntity, CartEntity, PartialCartEntity, ObjectEntity } from '../typeorm/entitiesIndex';
import { Repository } from 'typeorm';
import { CreateUpdatePartialCartDto } from './dtos/CreateUpdatePartialCart.dto';


@Injectable()
export class CartService {
	constructor(
		@InjectRepository(PartialCartEntity) private readonly partialCartRepository: Repository<PartialCartEntity>,
		@InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
		private readonly objectService: ObjectService,
	){}

	
  
  async createCart(customer: CustomerEntity){
    const newCart = await this.cartRepository.create({createdAt: new Date(), customer: customer, carts: []});
    return await this.cartRepository.save(newCart);
  }

  async createPartialCart(createUpdatePartialCartDto: CreateUpdatePartialCartDto, object: ObjectEntity, cart: CartEntity){
    const partialCart = await this.partialCartRepository.create({...createUpdatePartialCartDto, object: object, cart: cart});   
    return await this.partialCartRepository.save(partialCart);
  }


//Get Functions

  //cart

	async getAllCarts(){
		return await this.cartRepository.find({relations: ['customer']});
		// return await this.cartRepository.find({relations: ['customer', 'carts', 'carts.object']});
    // return await this.cartRepository.find({relations: {customer: true, carts: true}});
	}
  
  async getPendingCart(code: string){
    return await this.cartRepository.findOne({relations: ['carts'], where: {customer: {code}, pending: true}});

  }

  async getCartWithRelationsCustomerMerchant(id: number){
    return await this.cartRepository.findOne({where: {id}, relations: {customer: true, carts: true}});
  }

  async getCartWithRelationCustomer(id: number){
    return await this.cartRepository.findOne({where: {id}, relations: ['customer', 'carts', 'carts.object']});
  }

	async getCartFromCustomer(code: string){
		return await this.cartRepository.find({relations: ['customer'], where: {customer: {code}}});
	}

  //partialCart

	async getPartialCartsFromCart(id: number){
		return await this.partialCartRepository.find({relations: ['object'], where: {cart: {id}}});

	}

	async getPartialCartsFromCartWithRelations(id: number){
		return await this.partialCartRepository.find({relations: ['object', 'object.merchant'], where: {cart: {id: id}}});
	}

	async getPartialCartFromCart(id: number, objectNumber: string){
		return await this.partialCartRepository.findOne({where: {cart: {id}, object: {objectNumber}}});
	}


	async getPartialCartWithObject(id: number, objectNumber: string){
		return await this.partialCartRepository.findOne({relations: ['cart'], where: {cart: {id}, object: {objectNumber}}});
	}


//Update Functions

  //cart

  async updateCart(cart: CartEntity, createUpdatePartialCartDto: CreateUpdatePartialCartDto){
    await this.cartRepository.update(cart.id, {quantity: cart.quantity + createUpdatePartialCartDto.quantity, totalPrice: cart.totalPrice + createUpdatePartialCartDto.subPrice});
    return cart;
  }

  async updateCartWithNewPartialCart(cart: CartEntity, createUpdatePartialCartDto: CreateUpdatePartialCartDto, partialCart: PartialCartEntity){
    cart.carts.push(partialCart);
    await this.cartRepository.update(cart.id, {quantity: cart.quantity + createUpdatePartialCartDto.quantity, totalPrice: cart.totalPrice + createUpdatePartialCartDto.subPrice});
    return cart;
  }

    //Cart becomes an order
  async updateCartPaidStatus(id: number){
    return await this.cartRepository.update(id, {paid: true});      
  }

  async updateCartPendingStatus(id: number){
    return await this.cartRepository.update(id, {pending: false});     
  }

//partialCart

  async updatePartialCart(partialCart: PartialCartEntity, createUpdatePartialCartDto: CreateUpdatePartialCartDto){
    partialCart.quantity += createUpdatePartialCartDto.quantity;
    partialCart.subPrice += createUpdatePartialCartDto.subPrice;
    await this.partialCartRepository.update(partialCart.id, {quantity: partialCart.quantity, subPrice: partialCart.subPrice});
    return partialCart;
  }

//Delete Functions

  //cart

  async deletePendingCart(code: string){
    const cart = await this.getPendingCart(code);
    const id = cart.id;
    return await this.cartRepository.delete(id);
  }

  async deleteOrder(id: number){
    return await this.cartRepository.delete(id);
  }

  //partialCart

  async deletePartialCart(code: string, objectNumber: string){
    const cart = await this.getPendingCart(code);
    const object = await this.objectService.getObjectByobjectNumberWithRelationMerchant(objectNumber);
    if (cart && object){
      console.log('cart and object exist');
      const id = cart.id;
      const cartItem = await this.getPartialCartWithObject(id, objectNumber);
      if(cartItem){
        const cartItemId = cartItem.id;
        console.log('cartItem exists');
        const newQuantity = cart.quantity - cartItem.quantity;
        const newTotalPrice = cart.totalPrice - (cartItem.quantity * object.price);
        await this.partialCartRepository.delete(cartItemId);
        return await this.cartRepository.update(id, {quantity: newQuantity, totalPrice: newTotalPrice});
      }            
    }
  }



		



}
