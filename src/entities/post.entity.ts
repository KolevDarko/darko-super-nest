import { BaseEntity } from "@common/database/base-entity.entity";
import { ArrayType, Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { slugify } from "helper-fns";

import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class Post extends BaseEntity {
	@Property()
	slug!: string;

	@Property()
	title!: string;

	@Property()
	description!: string;

	@Property({ type: "text" })
	content!: string;

	@Property({ type: ArrayType })
	tags: string[];

	@ManyToOne({ eager: false })
	author: User;

	@OneToMany(() => Comment, comment => comment.post, {
		eager: false,
		orphanRemoval: true,
	})
	comments = new Collection<Comment>(this);

	@Property()
	favoritesCount = 0;

	constructor(partial?: Partial<Post>) {
		super();
		Object.assign(this, partial);
		this.slug = slugify(partial.title);
	}
}
