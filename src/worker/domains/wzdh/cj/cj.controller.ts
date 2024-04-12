import { CmdRoute, CmdRouteArguments, Controller, Method, Component } from '@istock/iswork';
import { CjService } from './cj.service';
import cmdJson from './cj.cmd';

@Controller({
  alias: 'cj',
})
export class CjController {
  constructor(private readonly cjService: CjService) {}

  @CmdRoute(cmdJson.cmdRoute)
  @Method({
    alias: cmdJson.cmdRoute.cmd,
  })
  @Component('ShNavList')
  async getSiteList(@CmdRouteArguments(0) tag?: string) {
    const result = await this.cjService.getSiteList(tag);
    if (tag) {
      return {
        list: [
          {
            title: tag,
            children: result.map((item) => {
              return {
                title: item.title,
                link: item.url,
              };
            }),
          },
        ],
      };
    }
    let tagIndex = 0;
    const list: Array<{ title: string; children: Array<{ title: string; link: string }> }> = [];
    result.reduce<Record<string, number>>((record, data) => {
      if (record[data.tag] === undefined) {
        record[data.tag] = tagIndex;
        tagIndex++;
        list.push({
          title: data.tag,
          children: [{ title: data.title, link: data.url }],
        });
      } else {
        const index = record[data.tag];
        list[index].children.push({
          title: data.title,
          link: data.url,
        });
      }
      return record;
    }, {});
    return {
      list,
    };
  }
}
