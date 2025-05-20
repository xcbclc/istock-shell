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
            items: result.map((item) => {
              return {
                text: item.title,
                href: item.url,
              };
            }),
          },
        ],
      };
    }
    let tagIndex = 0;
    const list: Array<{ title: string; items: Array<{ text: string; href: string }> }> = [];
    result.reduce<Record<string, number>>((record, data) => {
      if (record[data.tag] === undefined) {
        record[data.tag] = tagIndex;
        tagIndex++;
        list.push({
          title: data.tag,
          items: [{ text: data.title, href: data.url }],
        });
      } else {
        const index = record[data.tag];
        list[index].items.push({
          text: data.title,
          href: data.url,
        });
      }
      return record;
    }, {});
    return {
      list,
    };
  }
}
