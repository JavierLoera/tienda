import * as bcrypt from 'bcrypt';

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Order } from './order.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 100 })
  name: string;
  @Column()
  email: string;
  @Column({ select: false })
  password: string;
  @Column({ select: false })
  sal: string;
  @Column()
  role: string;
  @Column()
  balance: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @BeforeInsert()
  async beforeInsertSal() {
    this.sal = await bcrypt.genSalt();
  }

  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @CreateDateColumn()
  created_at: Date;
  @Column({ default: null })
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at?: Date;
}
