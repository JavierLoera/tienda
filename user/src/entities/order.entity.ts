import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../entities/item.entity';
import { User } from '../entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  total: number;
  @CreateDateColumn()
  date: Date;
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
  @OneToMany(() => Item, (item) => item.order, { cascade: ['insert'] })
  items: Item[];

  getId(): number {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }
  getTotal(): number {
    return this.total;
  }
  setTotal(total: number) {
    this.total = total;
  }
  getDate(): string {
    return this.date.toISOString().split('T')[0];
  }
  setDate(date: Date) {
    this.date = date;
  }
  getUser(): User {
    return this.user;
  }
  setUser(user: User) {
    this.user = user;
  }
  getItems(): Item[] {
    return this.items;
  }
  setItems(items: Item[]) {
    this.items = items;
  }
}
