import {
  BaseModel,
  Model,
  PrimaryColumn,
  Column,
  Index,
  type TControllerMethodCmdRouteOptions,
  type TControllerMethodCmdRouteMetadata,
} from '@istock/iswork';

@Model('cmd-route')
export class CmdRouteModel extends BaseModel {
  @PrimaryColumn()
  id!: number | string;

  @Column()
  name!: string;

  @Index()
  @Column()
  cmd!: string;

  @Column()
  route!: string[];

  @Index()
  @Column()
  domainName!: string;

  @Column()
  domainViewName!: string;

  @Column()
  usage?: string;

  @Column()
  shortDescription?: string;

  @Column()
  description?: string;

  @Column()
  options?: TControllerMethodCmdRouteOptions[];

  @Column()
  subcommand?: TControllerMethodCmdRouteMetadata;

  @Column()
  arguments?: TControllerMethodCmdRouteOptions[];

  @Column()
  example?: string;

  @Column()
  updateDate?: Date;

  @Column()
  createDate?: Date;

  @Column()
  rowStatus!: number;
}
