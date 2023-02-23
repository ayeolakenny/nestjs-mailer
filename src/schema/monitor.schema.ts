import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MonitorDocument = HydratedDocument<Monitor>;

@Schema()
export class Monitor {
  @Prop()
  url: string;

  @Prop()
  expires: string;
}

export const MonitorSchema = SchemaFactory.createForClass(Monitor);
