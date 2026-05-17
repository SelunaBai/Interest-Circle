export const coverImages = [
  "/feed-images/cover-1.png",
  "/feed-images/cover-2.png",
  "/feed-images/cover-3.png",
  "/feed-images/cover-4.png",
  "/feed-images/cover-5.png",
  "/feed-images/cover-6.png",
];

export const interestCoverImages = [
  "/feed-images/cover-1.png",
  "/feed-images/cover-2.png",
  "/feed-images/cover-3.png",
];

export const imageStyles = {
  skirt:
    "linear-gradient(180deg, rgba(91,77,68,0.22), rgba(44,35,30,0.2)), linear-gradient(180deg, #97897f 0 40%, #f0e9e0 40% 100%)",
  campus:
    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.08)), linear-gradient(180deg, #cae8f4 0 35%, #f4f0e9 35% 52%, #59a545 52% 100%)",
  lake:
    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12)), linear-gradient(180deg, #75c2f8 0 28%, #3f7abb 28% 68%, #a9cee5 68% 100%)",
  portrait:
    "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.12)), linear-gradient(120deg, #739d49 0 30%, #8dcf8e 30% 48%, #caa17a 48% 74%, #e8d6c9 74% 100%)",
  clover:
    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06)), radial-gradient(circle at 28% 44%, #93d86c 0 10%, transparent 11%), radial-gradient(circle at 42% 35%, #78c852 0 12%, transparent 13%), radial-gradient(circle at 56% 46%, #8ed665 0 10%, transparent 11%), linear-gradient(180deg, #e7f6df 0, #9cd47d 100%)",
  coffee:
    "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.18)), linear-gradient(150deg, #cfb8a2 0 32%, #744a2d 32% 66%, #f2d3b1 66% 100%)",
  sunset:
    "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.1)), linear-gradient(180deg, #f5bc81 0 38%, #ee8466 38% 63%, #495f77 63% 100%)",
  desk:
    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.08)), linear-gradient(135deg, #e1d5c3 0 46%, #c2d0d8 46% 70%, #f6f7f7 70% 100%)",
  wardrobe:
    "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.14)), linear-gradient(160deg, #d4c5bd 0 30%, #b78b69 30% 52%, #eedbcf 52% 100%)",
  street:
    "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.12)), linear-gradient(180deg, #d5e7fa 0 30%, #b9c77c 30% 48%, #5b5966 48% 100%)",
  flower:
    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.08)), radial-gradient(circle at 42% 42%, #ffd7e0 0 12%, transparent 13%), radial-gradient(circle at 56% 48%, #ffecb8 0 8%, transparent 9%), linear-gradient(180deg, #d6f4d2 0, #7acb89 100%)",
  room:
    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.08)), linear-gradient(145deg, #eee6df 0 40%, #c49772 40% 68%, #8c6247 68% 100%)",
};

function cycleNoteCovers(items) {
  let noteIndex = 0;

  return items.map((item) => {
    if (item.type !== "note") {
      return item;
    }

    const coverSrc = coverImages[noteIndex % coverImages.length];
    noteIndex += 1;

    return {
      ...item,
      coverSrc,
    };
  });
}

export const feedsByTab = {
  follow: {
    items: cycleNoteCovers([
      { type: "note", media: "desk", title: "今天穿了最舒服的一套上班，衬衫版型太重要了", author: "Kiki整理局", likes: "118", height: 300, copy: "把通勤感做轻，不要堆太多配饰。" },
      { type: "note", media: "sunset", title: "下班江滩散步路线，30 分钟刚好放空", author: "是阿栗呀", likes: "542", height: 286, copy: "傍晚五点后风很舒服，桥下位置拍人像也稳。" },
      { type: "note", media: "room", title: "卧室小改造继续更新，奶油色真的很显松弛", author: "眠眠小屋", likes: "451", height: 326, copy: "先换床头灯，再补一块地毯，氛围提升会很明显。" },
      { type: "note", media: "flower", title: "周末给家里买了新花，真的会让心情变好", author: "一枝花房", likes: "67", height: 286, copy: "选粉白系最稳，和木色家具也很好配。" }
    ])
  },
  discover: {
    items: cycleNoteCovers([
      { type: "note", media: "skirt", caption: "奶灰色豹纹裙细节讲解", title: "奶灰色豹纹鱼尾裙！细节讲解", author: "大甜妮子", likes: "7", height: 415, copy: "这条裙子的重点不是花纹本身，而是鱼尾剪裁和奶灰色调的平衡。偏长一点的上衣扎进去，比例会很顺。" },
      { type: "interest", subtitle: "@小葵今天早睡了吗 创建的", name: "极简通勤穿搭", stats: "15收藏·3赞过·2评论", chat: "大家在圈里聊：通勤衬衫要不要选廓形款？有什...", gallery: ["desk", "wardrobe", "street"] },
      { type: "note", media: "campus", title: "穿这套去🇸🇬新加坡旅游被好多plmm要链接", author: "IAMJAM", likes: "313", height: 415, copy: "一整套都是轻量材质，最重要的是上衣干净、裤型利落，拍照会非常显人直。" },
      { type: "note", media: "lake", title: "大理已回…真的很难不爱这里 🌿人均1k+吃住行攻略", author: "小鱼漫游记", likes: "721", height: 350, copy: "如果只待两天，住在洱海东岸真的很方便，清晨和傍晚的光线都很好。吃住行压到人均 1k 左右是可以做到的。" },
      { type: "note", media: "portrait", title: "油画感侧颜拍法，公园长椅随手出片", author: "Luna", likes: "168", height: 230, copy: "逆光时把人放到树影边缘，侧颜会有一层很柔和的高光。" },
      { type: "note", media: "clover", title: "办公桌上的幸运四叶草，绿植控已经走不动了", author: "青禾植物志", likes: "86", height: 246, copy: "四叶草真的很适合办公室，小小一盆就能把桌面颜色提起来。" },
      { type: "note", media: "coffee", caption: "周末一人食", title: "武汉新开的brunch店，贝果和拿铁都在线", author: "Momo食记", likes: "249", height: 318, copy: "靠窗位更适合拍，奶油色桌面会让食物颜色更干净。" },
      { type: "note", media: "wardrobe", caption: "试衣间记录", title: "初夏白衬衫合集，版型和面料一次说清", author: "阿九穿搭", likes: "974", height: 372, copy: "硬挺面料更通勤，轻薄垂感更显松弛，关键看你的日常出现场景。" },
      { type: "note", media: "street", title: "低饱和通勤look，地铁口三分钟拍完", author: "Jojo", likes: "205", height: 260, copy: "衣服颜色不用多，控制在两到三种最容易干净。" },
      { type: "note", media: "room", title: "奶油风卧室改造第3天，床头终于有氛围了", author: "眠眠小屋", likes: "451", height: 326, copy: "把线条都做圆，材质再柔一点，空间就会有被照顾过的感觉。" }
    ])
  },
  wuhan: {
    items: cycleNoteCovers([
      { type: "note", media: "coffee", caption: "江汉路新店", title: "武汉新开的brunch店，贝果和拿铁都在线", author: "Momo食记", likes: "249", height: 318, copy: "位置很好找，工作日下午去不用怎么排队。" },
      { type: "note", media: "sunset", title: "东湖边最舒服的一段步道，傍晚真适合散步", author: "知知在武汉", likes: "630", height: 312, copy: "沿湖这一段风很大，夏天体感会比市区舒服很多。" },
      { type: "note", media: "street", title: "武汉地铁口 5 分钟通勤穿搭机位", author: "Jojo", likes: "205", height: 260, copy: "灰白蓝最适合武汉的街景，出片很稳。" },
      { type: "note", media: "campus", title: "武汉草地拍照，白色穿搭真的太占优势", author: "阿南", likes: "392", height: 370, copy: "背景要留大面积绿地，人物站中间会显得很松弛。" }
    ])
  }
};

export const marketItems = [
  { title: "通勤装备", desc: "白衬衫、薄西裤、轻便托特包的基础清单。" },
  { title: "旅行箱包", desc: "适合 3 天游的轻量搭配，按出发场景挑。" },
  { title: "家居角落", desc: "卧室灯具、边几和小地毯的搭配组合。" },
  { title: "拍照道具", desc: "最容易提升封面完成度的小物件集合。" }
];

export const messages = [
  { title: "极简通勤穿搭", desc: "有人回复了你：白衬衫我更推荐微落肩版型。" },
  { title: "系统通知", desc: "你收藏的 6 条笔记本周有更新。" },
  { title: "大甜妮子", desc: "发布了新笔记：灰调半裙怎么穿不显闷。" }
];

export const topTabs = [
  { key: "follow", label: "关注" },
  { key: "discover", label: "发现" },
  { key: "wuhan", label: "武汉" }
];
