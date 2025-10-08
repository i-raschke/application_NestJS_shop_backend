import { AdminEntity } from "./entities/AdminEntity";
import { CartEntity } from "./entities/CartEntity";
import { CustomerEntity } from "./entities/CustomerEntity";
import { MerchantEntity } from "./entities/MerchantEntity";
import { ObjectEntity } from "./entities/ObjectEntity";
import { PartialCartEntity } from "./entities/PartialCartEntity";
import { SessionEntity } from "./entities/SessionEntity";

const entities = [AdminEntity, CustomerEntity, SessionEntity, ObjectEntity, MerchantEntity, CartEntity, PartialCartEntity];

export{AdminEntity, CustomerEntity, SessionEntity, ObjectEntity, MerchantEntity,CartEntity, PartialCartEntity};

export default entities;