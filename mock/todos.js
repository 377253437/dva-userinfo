/**
 * @file todos api mock
 * @author  lizhengtai
 */
let index = 0;
const data = [
  {
    'id': '112542643',
    'title': 'HTML的学习',
    'detail': 'HTML的全称为超文本标记语言,是一种标记语言。它包括一系列标签.',
    'status': false
  },
  {
    'id': '1352216',
    'title': 'Javascript的学习',
    'detail': 'JavaScript,简称“JS”,是一种具有函数优先的轻量级，解释型或即时编译型的编程语言.',
    'status': false
  },
  {
    'id': '23532572574',
    'title': 'React的学习',
    'detail': 'React是用于构建用户界面的JavaScript库,起源于Facebook的内部项目.',
    'status': false
  },
  {
    'id': '11234623455412643',
    'title': '读一篇文献',
    'detail': '学习他人的思想，需要教育；挑战他人的思想，则需要智慧。刚进入研究生生活，还没来得及欢呼喜悦，阅读文献就成了我们学习的拦路虎，那该如何高效的阅读文献呢？下面给出了几条建议，帮助我们尽快适应研究生生活，早日成为科研大佬。',
    'status': false
  },
  {
    'id': '67495456',
    'title': '自己做一顿饭',
    'detail': '炖鸡：洗净切块，倒入热油锅内翻炒，待水分炒干时，倒入适量香醋，再迅速翻炒，至鸡块发出劈劈啪啪的爆响声时，立即加热水(没过鸡块)，再用旺火烧十分钟，即可放入调料，移小火上再炖20分钟，淋上香油即可出锅；',
    'status': false
  },
  {
    'id': '234647',
    'title': '运动半个小时',
    'detail': '《隋书·天文志上》：“梁华林重云殿前所置铜仪……其运动得东西转，以象天行。清李斗《扬州画舫录·草河录上》：“至今木鹤尚存，惟首能运动，以定时刻。',
    'status': false
  }
]
export default {
  'GET /api/todos': (req, res) => {
    res.json(data);
  },
  // 'GET /api/todos/:title':(req,res) => {
  //   const { title } = req.params
  //   data.filter(item => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
  //   res.json(data)
  // },
  'POST /api/todos': (req, res) => {
    const todo = {
      id: `index${++index}`,
      ...req.body,
      status: false,
    };
    data.unshift(todo);
    res.json(todo);
  },
  'DELETE /api/todos/:id': (req, res) => {
    const { id } = req.params;
    const itemIndex = data.findIndex(item => item.id === id);
    if (itemIndex > -1) data.splice(itemIndex, 1);
    res.end('success');
  },
  // 'DELETE /api/todos/': (req, res) => {
  //   data.filter((item) => item.status === false);
  //   res.end('success');
  // },
  'PUT /api/todos/:id': (req, res) => {
    const { id } = req.params;
    const itemIndex = data.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      data[itemIndex] = {
        ...data[itemIndex],
        ...req.body,
      };
      res.json(data[itemIndex]);
    }
    res.json(null);
  },
};
