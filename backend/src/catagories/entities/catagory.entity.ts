import { UserEntity } from "src/users/entities/user.entity"; // specific path may vary based on your folder structure
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  Timestamp 
} from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Timestamp; 

  @UpdateDateColumn()
  updatedAt: Timestamp;

  

  @ManyToOne(() => UserEntity, (user) => user.categories)
  addedBy: UserEntity;
}