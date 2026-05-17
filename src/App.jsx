import { useEffect, useRef, useState } from "react";
import { feedsByTab, imageStyles, interestCoverImages, marketItems, messages, topTabs } from "./data";

const FEED_COVER_HEIGHT = 178;

function App() {
  const [nav, setNav] = useState("home");
  const [tab, setTab] = useState("discover");
  const [overlay, setOverlay] = useState({ type: null, payload: null });
  const [composeOpen, setComposeOpen] = useState(false);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);

  const currentFeed = feedsByTab[tab];
  const profileItems = feedsByTab.discover.items.filter((item) => item.type === "note").slice(0, 4);

  function openDetail(item) {
    setOverlay({ type: "detail", payload: item });
  }

  function openCircle(item, prev = null, disableProfileLink = false) {
    setOverlay({ type: "circle", payload: item, prev, disableProfileLink });
  }

  function openProfileHome(item, prev = null) {
    setOverlay({ type: "profileHome", payload: item, prev });
  }

  function openSearch() {
    setOverlay({ type: "search", payload: null });
  }

  function closeOverlay() {
    setOverlay((current) => current.prev ?? { type: null, payload: null });
  }

  return (
    <div className="app-shell">
      <div className={`phone-frame ${overlay.type === "profileHome" ? "profile-home-active" : ""}`}>
        <StatusBar />

        <div className="screen-stack">
          <section className={`screen screen-main ${nav === "home" && !overlay.type ? "active" : ""}`}>
            <nav className="top-nav">
              <div className="nav-spacer" aria-hidden="true" />
              <div className="tabs">
                {topTabs.map((item) => (
                  <button
                    key={item.key}
                    className={`tab-button ${tab === item.key ? "active" : ""}`}
                    onClick={() => setTab(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="nav-spacer" aria-hidden="true" />
            </nav>

            <main className="feed-page">
              <section className="masonry">
                {currentFeed.items.map((item, index) =>
                  item.type === "interest" ? (
                    <InterestCard key={`${item.name}-${index}`} item={item} onOpen={() => openCircle(item)} />
                  ) : (
                    <NoteCard key={`${item.title}-${index}`} item={item} />
                  ),
                )}
              </section>
            </main>
          </section>

          <section className={`screen ${nav === "market" && !overlay.type ? "active" : ""}`}>
            <div className="sub-page">
              <div className="sub-header">
                <h2>市集</h2>
                <p>逛穿搭、家居、旅行清单</p>
              </div>
              <div className="panel-grid">
                {marketItems.map((item, index) => (
                  <article
                    key={item.title}
                    className="market-panel"
                    style={{ background: index % 2 === 0 ? "#fff7f2" : "#f7fbff" }}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`screen ${nav === "messages" && !overlay.type ? "active" : ""}`}>
            <div className="sub-page">
              <div className="sub-header">
                <h2>消息</h2>
                <p>互动提醒与兴趣圈讨论</p>
              </div>
              <div className="message-list">
                {messages.map((item) => (
                  <article key={item.title} className="message-item">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`screen ${nav === "profile" && !overlay.type ? "active" : ""}`}>
            <div className="sub-page">
              <div className="profile-card">
                <div className="profile-top">
                  <div className="avatar xl" />
                  <div>
                    <h2>Baixingyue</h2>
                    <p>@兴趣圈体验官</p>
                  </div>
                </div>
                <div className="profile-stats">
                  <div><strong>86</strong><span>收藏</span></div>
                  <div><strong>24</strong><span>关注</span></div>
                  <div><strong>132</strong><span>粉丝</span></div>
                </div>
              </div>
              <div className="profile-section">
                {profileItems.map((item) => (
                  <div key={item.title} className="profile-mini-note">
                    <p>{item.title}</p>
                    <div className="profile-mini-cover" style={{ background: imageStyles[item.media] }} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Overlay
            overlay={overlay}
            closeOverlay={closeOverlay}
            openDetail={openDetail}
            openCircle={openCircle}
            openProfileHome={openProfileHome}
            setBottomNavHidden={setBottomNavHidden}
          />
        </div>

        <div className={`compose-sheet ${composeOpen ? "open" : ""}`}>
          <button className="sheet-close" onClick={() => setComposeOpen(false)}>×</button>
          <h3>发布你的新笔记</h3>
          <div className="compose-actions">
            <button><span>📷</span><b>拍摄封面</b></button>
            <button><span>✍</span><b>写图文</b></button>
            <button><span>🎞</span><b>发短视频</b></button>
          </div>
        </div>
        <button
          className={`sheet-mask ${composeOpen ? "open" : ""}`}
          aria-label="关闭发布面板"
          onClick={() => setComposeOpen(false)}
        />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <header className="status-bar">
      <span className="time">17:23</span>
      <div className="dynamic-island" />
      <div className="status-icons">
        <span className="signal"><i /><i /><i /><i /></span>
        <span className="wifi"><b /></span>
        <span className="battery"><b /></span>
      </div>
    </header>
  );
}

function LongPressable({ children, onClick, onLongPress, className = "" }) {
  const timerRef = useRef(null);
  const longPressTriggeredRef = useRef(false);
  const startPointRef = useRef({ x: 0, y: 0 });
  const [pressing, setPressing] = useState(false);

  function clearPressTimer() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPressing(false);
  }

  function startPress(event) {
    if (!onLongPress) return;
    clearPressTimer();
    longPressTriggeredRef.current = false;
    startPointRef.current = {
      x: event.clientX ?? 0,
      y: event.clientY ?? 0,
    };
    setPressing(true);
    timerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      setPressing(false);
      onLongPress();
    }, 650);
  }

  function endPress() {
    clearPressTimer();
  }

  function movePress(event) {
    if (!timerRef.current) return;

    const deltaX = Math.abs((event.clientX ?? 0) - startPointRef.current.x);
    const deltaY = Math.abs((event.clientY ?? 0) - startPointRef.current.y);

    if (deltaX > 8 || deltaY > 8) {
      clearPressTimer();
    }
  }

  function handleClick(event) {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  }

  return (
    <div
      className={`${className} ${pressing ? "is-pressing" : ""}`.trim()}
      onClick={handleClick}
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerLeave={endPress}
      onPointerCancel={endPress}
      onPointerMove={movePress}
    >
      {children}
    </div>
  );
}

function NoteCard({ item, onOpen, onLongPress }) {
  return (
    <LongPressable onClick={onOpen} onLongPress={onLongPress}>
      <article className="note-card">
        <CoverMedia item={item} className="note-media" height={FEED_COVER_HEIGHT} />
        <h3 className="note-title">{item.title}</h3>
        <div className="note-meta">
          <div className="author">
            <div className="avatar" />
            <span className="author-name">{item.author}</span>
          </div>
          <div className="like-wrap">
            <span className="heart">♡</span>
            <span className="like-count">{item.likes}</span>
          </div>
        </div>
      </article>
    </LongPressable>
  );
}

function CoverMedia({ item, className, height }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={className} style={{ height, background: imageStyles[item.media] }}>
      {item.coverSrc && !failed ? (
        <img
          className="note-media-image"
          src={item.coverSrc}
          alt={item.title}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}

function InterestCard({ item, onOpen }) {
  return (
    <article className="interest-card" onClick={onOpen}>
      <h3 className="interest-title">猜你想逛ta的兴趣圈</h3>
      <div className="interest-user">
        <img className="interest-avatar-image" src="/feed-images/1.webp" alt={item.name} />
        <div>
          <p className="interest-subtitle">{item.subtitle}</p>
          <p className="interest-name">{item.name}</p>
        </div>
      </div>
      <div className="interest-gallery">
        {interestCoverImages.map((src, index) => (
          <div
            key={`${item.name}-${src}`}
            className="interest-thumb"
            style={{ background: imageStyles[item.gallery[index] || item.gallery[0]] }}
          >
            <img className="note-media-image" src={src} alt={`${item.name}封面${index + 1}`} />
          </div>
        ))}
      </div>
      <p className="interest-stats">{item.stats}</p>
      <div className="interest-chat">{item.chat}</div>
      <button
        className="interest-button"
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
      >
        去看看
      </button>
    </article>
  );
}

function Overlay({ overlay, closeOverlay, openDetail, openCircle, openProfileHome, setBottomNavHidden }) {
  if (!overlay.type) return null;

  if (overlay.type === "detail") {
    const item = overlay.payload;
    return (
      <section className="screen detail-screen active">
        <div className="detail-header">
          <button className="back-button" onClick={closeOverlay} aria-label="返回">
            <img className="back-icon-image" src="/feed-images/返回.png" alt="" />
          </button>
          <span>笔记详情</span>
          <button className="ghost-button">···</button>
        </div>
        <div className="detail-scroll">
          <div
            className="detail-hero"
            style={{ background: imageStyles[item.media], height: Math.max(item.height + 60, 380) }}
          />
          <div className="detail-body">
            <h1>{item.title}</h1>
            <div className="detail-author">
              <div className="avatar large" />
              <div>
                <p>{item.author}</p>
                <p>刚刚更新 · {item.likes} 人觉得有用</p>
              </div>
            </div>
            <div className="detail-copy">
              <p>{item.copy}</p>
            </div>
            <p className="detail-meta">标签：穿搭 · 通勤 · 收藏夹</p>
            <div className="detail-actions">
              <button>♡ 收藏</button>
              <button>↗ 分享</button>
              <button>💬 评论</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (overlay.type === "circle") {
    const item = overlay.payload;
    const disableProfileLink = Boolean(overlay.disableProfileLink);
    const [circleTab, setCircleTab] = useState("likes");
    const [messageComposerOpen, setMessageComposerOpen] = useState(false);
    const [messageDraft, setMessageDraft] = useState("");
    const [composerQuote, setComposerQuote] = useState(null);
    const composerTextareaRef = useRef(null);
    const circleComments = [
      {
        id: 1,
        user: "小葵今天早睡了吗",
        text: "你好美！想问一下第一套的卡其风衣和托特包有链接吗？",
        source: "来自笔记 · 穿这套去🇸🇬新加坡旅游被好多...",
        meta: "1天前  湖北",
      },
      {
        id: 2,
        user: "小葵今天早睡了吗",
        text: "天呐！微胖梨形身材的天选穿搭！已入！",
        source: "来自笔记 · 周一例会西装姐～主打简约长...",
        meta: "3天前  上海",
      },
    ];
    const [circleMessages, setCircleMessages] = useState([
      {
        id: 1,
        user: "什锦罐头",
        avatar: "/feed-images/2.jpeg",
        text: "姐妹你买到了吗？求链接🙏",
        source: "引用笔记 · 穿这套去🇸🇬新加坡旅游被好多...",
        meta: "1天前  北京",
      },
      {
        id: 2,
        user: "小吵酱",
        avatar: "/feed-images/3.jpg",
        text: "怎么样啊姐妹？蹲一个评价",
        source: "引用评论 · 天呐！微胖梨形身材的天选穿...",
        meta: "2天前  上海",
      },
      {
        id: 3,
        user: "一颗橘子树",
        avatar: "/feed-images/4.webp",
        text: "姐妹咱俩的穿搭风格完全一样啊！！可以互相推荐下店铺🥺",
        meta: "6天前  上海",
        reply: {
          user: "小葵今天早睡了吗",
          avatar: "/feed-images/1.webp",
          text: "好呀好呀！先关注下我～",
          meta: "5天前  上海",
        },
      },
    ]);
    const circleNotes = feedsByTab.discover.items.filter((entry) => entry.type === "note").slice(0, 2);

    useEffect(() => {
      if (!messageComposerOpen) return;

      const timer = window.setTimeout(() => {
        composerTextareaRef.current?.focus();
      }, 80);

      return () => window.clearTimeout(timer);
    }, [messageComposerOpen]);

    useEffect(() => {
      setBottomNavHidden(messageComposerOpen);
      return () => setBottomNavHidden(false);
    }, [messageComposerOpen, setBottomNavHidden]);

    function openMessageComposer(quote = null) {
      setComposerQuote(quote);
      setMessageComposerOpen(true);
    }

    function appendDraftText(text) {
      setMessageDraft((current) => current + text);
      window.setTimeout(() => composerTextareaRef.current?.focus(), 0);
    }

    function handleKeyboardKey(key) {
      if (key === "BACKSPACE") {
        setMessageDraft((current) => current.slice(0, -1));
        return;
      }

      if (key === "SPACE") {
        appendDraftText(" ");
        return;
      }

      if (key === "SEND") {
        submitMessage();
        return;
      }

      appendDraftText(key);
    }

    function submitMessage() {
      const value = messageDraft.trim();
      if (!value) return;

      setCircleMessages((current) => [
        {
          id: Date.now(),
          user: "露娜白",
          avatar: "/feed-images/5.webp",
          text: value,
          source: composerQuote?.text || undefined,
          meta: "刚刚  北京",
        },
        ...current,
      ]);
      setMessageDraft("");
      setComposerQuote(null);
      setMessageComposerOpen(false);
      setCircleTab("messages");
    }

    return (
      <section className="screen detail-screen active circle-page-screen">
        <div className="detail-header circle-page-header">
          <button className="back-button circle-back-button" onClick={closeOverlay} aria-label="返回">
            <img className="back-icon-image" src="/feed-images/返回_副本.png" alt="" />
          </button>
          <span>{item.name}</span>
          <div className="circle-header-spacer" />
        </div>
        <div className="detail-scroll circle-page-scroll">
          <div className={`circle-profile-card ${disableProfileLink ? "no-profile-button" : ""}`}>
            <img className="circle-profile-avatar" src="/feed-images/1.webp" alt={item.name} />
            <div className="circle-profile-main">
              <p className="circle-profile-subtitle">{item.subtitle}</p>
              <h1>{item.name}</h1>
              <p className="circle-profile-stats">{item.stats}</p>
              <div className="circle-profile-tags">
                <span>你们都喜欢</span>
                <span className="circle-tag">低饱和通勤</span>
              </div>
            </div>
            {!disableProfileLink ? (
              <button
                className="circle-profile-button"
                onClick={() => {
                  openProfileHome(item, overlay);
                }}
              >
                看看ta的主页
              </button>
            ) : null}
          </div>
          <div className="circle-content-card">
            <div className="circle-page-tabs">
              <button
                className={`circle-page-tab ${circleTab === "likes" ? "active" : ""}`}
                onClick={() => setCircleTab("likes")}
              >
                收藏/喜欢
              </button>
              <button
                className={`circle-page-tab ${circleTab === "comments" ? "active" : ""}`}
                onClick={() => setCircleTab("comments")}
              >
                评论
              </button>
              <button
                className={`circle-page-tab ${circleTab === "messages" ? "active" : ""}`}
                onClick={() => setCircleTab("messages")}
              >
                留言
              </button>
            </div>
            {circleTab === "likes" ? (
              <div className="circle-page-feed">
                {circleNotes.map((note) => (
                  <NoteCard
                    key={`circle-${note.title}`}
                    item={note}
                    onLongPress={() =>
                      openMessageComposer({
                        text: `引用笔记 · ${note.title}`,
                      })
                    }
                  />
                ))}
              </div>
            ) : null}
            {circleTab === "comments" ? (
              <div className="circle-comment-list">
                {circleComments.map((comment) => (
                  <LongPressable
                    key={comment.id}
                    onLongPress={() =>
                      openMessageComposer({
                        text: `引用评论 · ${comment.text}`,
                      })
                    }
                  >
                    <article className="circle-comment-item">
                      <img className="circle-comment-avatar" src="/feed-images/1.webp" alt={comment.user} />
                      <div className="circle-comment-body">
                        <p className="circle-comment-user">{comment.user}</p>
                        <p className="circle-comment-text">{comment.text}</p>
                        <p className="circle-comment-source">{comment.source}</p>
                        <p className="circle-comment-meta">{comment.meta}</p>
                      </div>
                    </article>
                  </LongPressable>
                ))}
              </div>
            ) : null}
            {circleTab === "messages" ? (
              <>
                <div className="circle-message-list">
                  {circleMessages.map((message) => (
                    <article key={message.id} className="circle-message-item">
                      <img className="circle-message-avatar" src={message.avatar} alt={message.user} />
                      <div className="circle-message-body">
                        <p className="circle-comment-user">{message.user}</p>
                        <p className="circle-comment-text">{message.text}</p>
                        {message.source ? <p className="circle-comment-source">{message.source}</p> : null}
                        <p className="circle-comment-meta">{message.meta}</p>
                        {message.reply ? (
                          <div className="circle-message-reply">
                            <img className="circle-message-reply-avatar" src={message.reply.avatar} alt={message.reply.user} />
                            <div className="circle-message-reply-body">
                              <p className="circle-comment-user">{message.reply.user}</p>
                              <p className="circle-comment-text">{message.reply.text}</p>
                              <p className="circle-comment-meta">{message.reply.meta}</p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
                <button className="circle-message-fab" onClick={() => openMessageComposer()}>+</button>
              </>
            ) : null}
          </div>
        </div>
        {messageComposerOpen ? (
          <>
            <button
              className={`circle-composer-mask ${messageComposerOpen ? "open" : ""}`}
              aria-label="关闭留言面板"
              onClick={() => {
                setMessageComposerOpen(false);
                setComposerQuote(null);
              }}
            />
            <div className={`circle-composer-sheet ${messageComposerOpen ? "open" : ""}`}>
              {composerQuote ? <div className="circle-composer-quote">{composerQuote.text}</div> : null}
              <div className="circle-composer-card">
                <textarea
                  ref={composerTextareaRef}
                  className="circle-composer-textarea"
                  placeholder="说点什么..."
                  value={messageDraft}
                  onChange={(event) => setMessageDraft(event.target.value)}
                />
              </div>
              <div className="circle-composer-toolbar">
                <div className="circle-composer-icons">
                  <span>◉</span>
                  <span>⌘</span>
                  <span>@</span>
                  <span>☺</span>
                </div>
                <label className="circle-composer-check">
                  <input type="checkbox" />
                  <span>仅圈主可见</span>
                </label>
                <button
                  className={`circle-composer-send ${messageDraft.trim() ? "active" : ""}`}
                  onClick={submitMessage}
                >
                  发送
                </button>
              </div>
              <div className="circle-composer-emojis">
                <span>🥺</span>
                <span>😭</span>
                <span>😤</span>
                <span>😂</span>
                <span>🥰</span>
                <span>😚</span>
                <span>🥺</span>
              </div>
              <div className="circle-composer-keyboard">
                <div className="keyboard-voice-bar">
                  <button className="keyboard-tool keyboard-tool-grid">⌘</button>
                  <button className="keyboard-voice-pill">🎙 点击说话</button>
                  <button className="keyboard-tool keyboard-tool-collapse">⌄</button>
                </div>
                <div className="keyboard-row keyboard-row-top">
                  {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
                    <button key={key} className="keyboard-key" onClick={() => handleKeyboardKey(key)}>{key}</button>
                  ))}
                </div>
                <div className="keyboard-row">
                  {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
                    <button key={key} className="keyboard-key" onClick={() => handleKeyboardKey(key)}>{key}</button>
                  ))}
                </div>
                <div className="keyboard-row keyboard-row-shift">
                  <button className="keyboard-key keyboard-key-fn">⇧</button>
                  {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
                    <button key={key} className="keyboard-key" onClick={() => handleKeyboardKey(key)}>{key}</button>
                  ))}
                  <button className="keyboard-key keyboard-key-fn" onClick={() => handleKeyboardKey("BACKSPACE")}>⌫</button>
                </div>
                <div className="keyboard-row keyboard-row-bottom">
                  <button className="keyboard-key keyboard-key-wide">123</button>
                  <button className="keyboard-key keyboard-key-mid" onClick={() => handleKeyboardKey(",")}>,</button>
                  <button className="keyboard-key keyboard-key-space" onClick={() => handleKeyboardKey("SPACE")}>
                    <span className="keyboard-wave">⌁</span>
                  </button>
                  <button className="keyboard-key keyboard-key-lang">中英</button>
                  <button className="keyboard-key keyboard-key-send" onClick={() => handleKeyboardKey("SEND")}>发送</button>
                </div>
                <div className="keyboard-row keyboard-row-tools">
                  <button className="keyboard-tool keyboard-tool-globe">◌</button>
                  <div className="keyboard-home-indicator" />
                  <button className="keyboard-tool keyboard-tool-mic">🎙</button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </section>
    );
  }

  if (overlay.type === "profileHome") {
    const item = overlay.payload;
    return (
      <section className="screen detail-screen active profile-home-screen">
        <div className="profile-home-top">
          <div className="profile-home-header">
            <button className="back-button profile-home-back" onClick={closeOverlay} aria-label="返回">
              <img className="back-icon-image" src="/feed-images/返回.png" alt="" />
            </button>
          </div>
          <div className="profile-home-user">
            <img className="profile-home-avatar" src="/feed-images/1.webp" alt="小葵今天早睡了吗" />
            <div className="profile-home-main">
              <h1>小葵今天早睡了吗</h1>
              <p>小红书号：</p>
              <p>IP：湖北</p>
            </div>
          </div>
          <div className="profile-home-stats">
            <div><strong>2022</strong><span>关注</span></div>
            <div><strong>368</strong><span>粉丝</span></div>
            <div><strong>2.3万</strong><span>获赞与收藏</span></div>
          </div>
          <p className="profile-home-bio">希望每天都能睡好多觉！！！</p>
          <div className="profile-home-age">24岁</div>
          <div className="profile-home-actions">
            <button className="profile-home-follow">关注</button>
            <button className="profile-home-message">发私信</button>
            <button className="profile-home-add">
              <img src="/feed-images/关注.png" alt="关注" />
            </button>
          </div>
        </div>
        <div className="profile-home-body">
          <div className="profile-home-tabs">
            <button className="profile-home-tab">笔记</button>
            <button className="profile-home-tab active">兴趣圈</button>
          </div>
          <div className="profile-home-section">
            <h2>ta的兴趣标签</h2>
            <div className="profile-home-tags">
              <span>低饱和通勤</span>
              <span>咖啡探店</span>
            </div>
          </div>
          <button className="profile-home-circle-card" onClick={() => openCircle(item, overlay, true)}>
            <h3>{item.name}</h3>
            <p>{item.stats}</p>
            <div className="profile-home-circle-gallery">
              <img src="/feed-images/cover-1.png" alt="" />
              <img src="/feed-images/cover-2.png" alt="" />
              <img src="/feed-images/cover-3.png" alt="" />
            </div>
          </button>
        </div>
      </section>
    );
  }

  const searchItems = feedsByTab.discover.items.filter((item) => item.type === "note").slice(0, 5);
  return (
    <section className="screen detail-screen active">
      <div className="detail-header">
        <button className="back-button" onClick={closeOverlay} aria-label="返回">
          <img className="back-icon-image" src="/feed-images/返回.png" alt="" />
        </button>
        <span>搜索</span>
        <button className="ghost-button">取消</button>
      </div>
      <div className="search-shell">
        <div className="search-box">
          <span className="search-mini-icon" />
          <input defaultValue="通勤穿搭" aria-label="搜索关键词" />
        </div>
        <div className="chip-list">
          <button>白衬衫通勤</button>
          <button>武汉周末</button>
          <button>旅行穿搭</button>
          <button>奶油风卧室</button>
        </div>
        <div className="search-results">
          {searchItems.map((item) => (
            <article key={item.title} className="search-result">
              <div className="search-result-cover" style={{ background: imageStyles[item.media] }} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.author} · {item.likes} 收藏</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
