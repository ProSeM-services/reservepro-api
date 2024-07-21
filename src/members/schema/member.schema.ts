import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import mongoose, {
  Document,
  SchemaTimestampsConfig,
  Model,
  Types,
} from 'mongoose';
import { IWorkhour } from 'src/common/workhours';
import { Company } from 'src/company/schema/company.schema';
import { Role } from 'src/constants/roles';
@Schema({ timestamps: true })
export class Member extends Document {
  _id?: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  role: Role;
  @Prop({ type: String })
  image?: string;
  @Prop({ type: String, required: false })
  password: string;
  @Prop({ type: String, required: false })
  salt: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Company' }], default: [] })
  companies: mongoose.Schema.Types.ObjectId[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Appointment' }], default: [] })
  appointments: mongoose.Schema.Types.ObjectId[];
  @Prop({ type: Array, default: [] })
  workhours: IWorkhour[];
}
export const MemberSchema = SchemaFactory.createForClass(Member);

MemberSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await genSalt(10);
    this.salt = salt;
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

export type MemberDocument = Member & Document & SchemaTimestampsConfig;
export interface MemberModel extends Model<MemberDocument> {}
