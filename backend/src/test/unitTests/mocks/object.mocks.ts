import { CreateObjectDto } from "../../../object/dtos/CreateObject.dto";
import { UpdateObjectAmountDto } from "../../../object/dtos/UpdateObjectAmount.dto";
import { UpdateObjectPriceDto } from "../../../object/dtos/UpdateObjectPrice.dto";
import { MerchantEntity, ObjectEntity } from "../../../typeorm/entitiesIndex";




export const mockMerchant = new MerchantEntity();
mockMerchant.id = 1;
mockMerchant.companyName = 'testCompany';
mockMerchant.code = 'ABCD-EFGH';


export const mockCreateObjectDto = new CreateObjectDto();
mockCreateObjectDto.amount = 1;
mockCreateObjectDto.color = 'kuro';
mockCreateObjectDto.object = 'test';
mockCreateObjectDto.objectNumber = '1';
mockCreateObjectDto.price = 1.11;


export const mockCreateObjectDtoNotAvailable = new CreateObjectDto();
mockCreateObjectDtoNotAvailable.amount = 0;
mockCreateObjectDtoNotAvailable.color = 'kuro';
mockCreateObjectDtoNotAvailable.object = 'test';
mockCreateObjectDtoNotAvailable.objectNumber = '1';
mockCreateObjectDtoNotAvailable.price = 1.11;


export const mockUpdateObjectAmountDto = new UpdateObjectAmountDto();
mockUpdateObjectAmountDto.amount = 3;

export const mockUpdateObjectAmountDtoNotAvailable = new UpdateObjectAmountDto();
mockUpdateObjectAmountDtoNotAvailable.amount = 0;

export const mockUpdateObjectPriceDto = new UpdateObjectPriceDto();
mockUpdateObjectPriceDto.price = 2.22;


export const mockObject = new ObjectEntity();
mockObject.id = 1;
mockObject.object = mockCreateObjectDto.object;
mockObject.objectNumber = mockCreateObjectDto.objectNumber;
mockObject.color = mockCreateObjectDto.color;
mockObject.price = mockCreateObjectDto.price;
mockObject.amount = mockCreateObjectDto.amount;
mockObject.available = true;
mockObject.merchant = mockMerchant;
mockObject.merchant.companyName = mockMerchant.companyName;

export const mockObjectNotAvailable = new ObjectEntity();
mockObjectNotAvailable.id = 1;
mockObjectNotAvailable.object = mockCreateObjectDto.object;
mockObjectNotAvailable.objectNumber = mockCreateObjectDto.objectNumber;
mockObjectNotAvailable.color = mockCreateObjectDto.color;
mockObjectNotAvailable.price = mockCreateObjectDto.price;
mockObjectNotAvailable.amount = mockCreateObjectDto.amount;
mockObjectNotAvailable.available = true;
mockObjectNotAvailable.merchant = mockMerchant;
mockObjectNotAvailable.merchant.companyName = mockMerchant.companyName;

export const session = {passport: { user: {companyName: mockMerchant.companyName, role: 'merchant', code: mockObject.merchant.code} }};