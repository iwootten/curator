import { Entity } from '@platformatic/sql-mapper';
import graphqlPlugin from '@platformatic/sql-graphql'
import { Link } from './types/Link'
import { Tag } from './types/Tag'
import { LinkTag } from './types/LinkTag'

declare module '@platformatic/sql-mapper' {
  interface Entities {
    link: Entity<Link>,
    tag: Entity<Tag>,
    linkTag: Entity<LinkTag>,
  }
}
