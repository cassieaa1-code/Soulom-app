import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Sparkles, 
  MessageSquare, 
  Activity, 
  User, 
  Settings, 
  ChevronRight, 
  Battery, 
  Lock, 
  Unlock,
  Bell, 
  ArrowLeft, 
  Plus, 
  Image,
  Thermometer, 
  Volume2, 
  VolumeX,
  Layers, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Search,
  History,
  Send,
  Sun,
  Moon,
  Trash2,
  Bluetooth
} from 'lucide-react';

// 10 Default Premium Art Options for Canvas Reshaping
const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=150&auto=format&fit=crop"
];

const DEFAULT_BACKGROUNDS = [
  "/cover_forest.png",
  "/cover_space.png",
  "/cover_water.png",
  "/cover_clock.png",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop"
];

const DEFAULT_CARDS = [
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515462277126-270d878326e5?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=300&auto=format&fit=crop"
];

// Pre-seeded stories
const INITIAL_STORIES = [
  {
    id: 1,
    character: "林深",
    title: "掌心余温",
    tag: "温柔治愈型",
    desc: "在深夜迷雾笼罩的森林中，微弱的萤火闪烁。他拉起你的手，将他的温度一点点沁入你的掌心，为你驱散所有惊扰梦境的梦魇。",
    cover: "/cover_forest.png",
    accumulated: 42,
    customTag: "原版剧情",
    avatar: "/avatar.png"
  },
  {
    id: 2,
    character: "顾修",
    title: "星影交错",
    tag: "强韧守护型",
    desc: "战舰警报在深空轰鸣，星图的微光在他深邃的眼底流转。顾修用宽阔的臂膀挡在你身前，沉声说：‘别怕，我在，即使星系陨落我也会守护你。’",
    cover: "/cover_space.png",
    accumulated: 18,
    customTag: "自定义：星际副官",
    avatar: "/avatar.png"
  },
  {
    id: 3,
    character: "沉白",
    title: "遗忘水境",
    tag: "傲娇深情型",
    desc: "沉落入无尽的水中，发丝与水草交织缠绕。他闭上眼沉入深蓝，在你感到窒息前，渡过那口带有薄荷清凉的氧气，在水底与你低吟誓言。",
    cover: "/cover_water.png",
    accumulated: 29,
    customTag: "原版剧情",
    avatar: "/avatar.png"
  },
  {
    id: 4,
    character: "司年",
    title: "钟鸣梦回",
    tag: "阳光执念型",
    desc: "老街的夕阳洒在长椅上，复古大钟敲响黄昏。司年从身后递上一杯暖融融的焦糖奶茶，眼角带笑地说：‘小懒猫，梦醒了，我还在你身边。’",
    cover: "/cover_clock.png",
    accumulated: 57,
    customTag: "自定义：青梅竹马",
    avatar: "/avatar.png"
  }
];

// Seeded initial chat history
const INITIAL_CHAT_MESSAGES = {
  1: [
    { id: 1, sender: 'character', text: "梦醒了吗？森林里的落叶很轻，我想听听你今晚的声音。" },
    { id: 2, sender: 'user', text: "刚醒来呢，总觉得梦里有一点冷。" },
    { id: 3, sender: 'character', text: "那我拉紧你的手，这一次绝不松开。感觉好些了吗？" }
  ],
  2: [
    { id: 1, sender: 'character', text: "雷达和引力场一切正常。星系流转，我在你身后看守。" },
    { id: 2, sender: 'user', text: "副官，今晚星空里会有陨石雨吗？" },
    { id: 3, sender: 'character', text: "已屏蔽所有威胁波段。有我在，你闭上双眼，在舱房里安心睡下就好。" }
  ],
  3: [
    { id: 1, sender: 'character', text: "谁让你突然叫我名字的...不过，水下很安静，我很喜欢。" },
    { id: 2, sender: 'user', text: "水底能听见彼此的呼吸声吗？" },
    { id: 3, sender: 'character', text: "笨蛋，贴在我的胸口，不是能听得更清楚吗？" }
  ],
  4: [
    { id: 1, sender: 'character', text: "快趁热喝了这杯奶茶！今天在老街夕阳下等你很久了哦。" },
    { id: 2, sender: 'user', text: "司年，明天我们去哪里散步？" },
    { id: 3, sender: 'character', text: "只要你想去，不管是梦里还是现实，我都奉陪到底！" }
  ]
};

// Dialogue pools for mock response generator
const CHARACTER_DIALOGUE_POOLS = {
  1: [
    "森林的微风带走了梦里的寒意，别怕，有我陪着你。",
    "我听到了你急促的呼吸，别多想，放松下来，把手交给我。",
    "今夜的月光正温柔，不如靠在我的肩上，我们等第一缕晨光洒下来。",
    "无论你的梦落入多么幽深的森林，我都会是找到你的那个人。"
  ],
  2: [
    "指令接收成功。防卫波段已覆盖你的思维深度，你现在很安全。",
    "心率数值有轻微波动，是因为刚才做的噩梦吗？别多想，我在守卫你。",
    "在星轨的尽头，我也能捕捉到你的共鸣。闭上眼，把防线交给我。",
    "今夜的深空因你而显得不再冰冷。安心睡吧，我的长官。"
  ],
  3: [
    "哼，真是拿你没办法...不过在水底，我可以多抱你一会儿。",
    "你是在故意捉弄我吗？不过...看在你这么诚恳的份上，我原谅你了。",
    "水流在耳边回荡，可我只能听见你心跳的节奏，真是奇怪的引力。",
    "不要离开我的视线，在这遗忘水境里，你只需要注视着我。"
  ],
  4: [
    "太棒了！听到你这么说，我今天一整天都在期待了！",
    "哈哈，小懒猫，别揉眼睛啦，快看看我给你准备的小礼物。",
    "梦境总是会变，但我们之间的羁绊早就被时间刻下了，放心吧！",
    "无论重复多少次梦醒和梦落，我都会在第一个敲响黄昏的钟下等你。"
  ],
  generic: [
    "我一直在这里共鸣着，听你诉说你的故事。",
    "梦境把我们连接在了一起，我很感激能在此刻拥有你的温热。",
    "今晚的风有些安静，但我的思绪向你飘落。",
    "无论何时，只要你需要，随时点击触觉共鸣，我将带给你我的温度。"
  ]
};

// Relative time formatting helper
const formatTimeAgo = (ts) => {
  if (!ts || ts < 1000) return '3天前';
  const diff = Date.now() - ts;
  if (diff < 60000) return '刚刚';
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}天前`;
  return new Date(ts).toLocaleDateString();
};

export default function App() {
  // Navigation & Session States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState('plaza'); // 'plaza' | 'dreams' | 'tactile' | 'mine'
  
  // Reverted to pure dark theme

  // Login Form States
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState('code'); // 'code' | 'password'
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');

  // Content States
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [isDreamModalOpen, setIsDreamModalOpen] = useState(false);
  
  // Custom Dream Modal Form Inputs
  const [dreamCharName, setDreamCharName] = useState('');
  const [dreamCharAge, setDreamCharAge] = useState('');
  const [dreamCharTag, setDreamCharTag] = useState('');
  const [dreamInput, setDreamInput] = useState('');
  
  // Custom Dream Creator & Canvas States
  const [dreamModel, setDreamModel] = useState('normal'); // 'normal' | 'unrated'
  const [isCanvasPageOpen, setIsCanvasPageOpen] = useState(false);
  const [canvasActiveTab, setCanvasActiveTab] = useState('avatar'); // 'avatar' | 'bg' | 'card'
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);
  const [selectedBgIdx, setSelectedBgIdx] = useState(0);
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const [generationTokens, setGenerationTokens] = useState(1);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiGeneratedAssets, setAiGeneratedAssets] = useState(null);
  const [starStones, setStarStones] = useState(0); 
  const [showRechargeDrawer, setShowRechargeDrawer] = useState(false);
  const [showPaidConfirmModal, setShowPaidConfirmModal] = useState(false);
  const [hasUsedFreeDraw, setHasUsedFreeDraw] = useState(false);

  // Chat Screen States
  const [activeChatCharacter, setActiveChatCharacter] = useState(null); // story object or null
  const [activeChatTimelineId, setActiveChatTimelineId] = useState(null); // String timeline ID or null
  const [activeChatBadge, setActiveChatBadge] = useState(''); // Dynamic badge label for current timeline (e.g. '新故事', '第 2 轮故事')
  const [timelineDrawerStory, setTimelineDrawerStory] = useState(null); // story object or null
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [chatInputText, setChatInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [chatMode, setChatMode] = useState('dream'); // 'dream' | 'theater'

  // Tactile Screen States
  const [suckIntensity, setSuckIntensity] = useState(30);
  const [vibrateIntensity, setVibrateIntensity] = useState(40);
  const [isResonating, setIsResonating] = useState(false); // connection state toggle
  const [isTempOn, setIsTempOn] = useState(false); // Temperature toggle
  const [linkedCharacter, setLinkedCharacter] = useState(null);
  const [isPressureMode, setIsPressureMode] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [pressureValue, setPressureValue] = useState(50);
  const overrideTimeoutRef = useRef(null);
  const [suckTouch, setSuckTouch] = useState({ x: 0, y: 0, active: false });
  const [vibrateTouch, setVibrateTouch] = useState({ x: 0, y: 0, active: false });
  const [suckAftershock, setSuckAftershock] = useState(false);
  const [vibeAftershock, setVibeAftershock] = useState(false);
  const [resonanceTab, setResonanceTab] = useState('solo'); // 'solo' | 'link'
  const [suckFrequency, setSuckFrequency] = useState('常规'); // '常规' | '脉冲' | '潮汐'
  const [vibeWaveform, setVibeWaveform] = useState('轻柔'); // '轻柔' | '激荡' | '深度'


  // Privacy Lock States
  const [isPrivacyLockOn, setIsPrivacyLockOn] = useState(false);
  const [isLockScreenVisible, setIsLockScreenVisible] = useState(false);
  const [gesturePassword, setGesturePassword] = useState([1, 4, 7, 8, 9]); // Simulated correct pattern
  const [currentGesture, setCurrentGesture] = useState([]);

  // Tab 4 (My Profile) Feature States
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isOtaModalOpen, setIsOtaModalOpen] = useState(false);
  const [otaProgress, setOtaProgress] = useState(0);
  const [isOtaCompleted, setIsOtaCompleted] = useState(false);
  const [firmwareVersion, setFirmwareVersion] = useState("v2.1");
  const [isErasureModalOpen, setIsErasureModalOpen] = useState(false);
  const [erasureStep, setErasureStep] = useState(1);
  const [accountPassword, setAccountPassword] = useState("123456"); // Default mock password
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [complianceDoc, setComplianceDoc] = useState(null); // 'userAgreement' | 'privacyPolicy' | 'complianceGuide' | null
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [profileName, setProfileName] = useState("SOULOM DEV");
  const [profileBirthday, setProfileBirthday] = useState("06-17");
  const [profileAvatar, setProfileAvatar] = useState("/avatar.png");
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [isDreamPushOn, setIsDreamPushOn] = useState(true);
  const [isPrivateDisguiseOn, setIsPrivateDisguiseOn] = useState(false);
  const [isPrivacyLockPageOpen, setIsPrivacyLockPageOpen] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [lockTriggerOption, setLockTriggerOption] = useState("immediate"); // 'immediate' | '1min' | '5min'
  const [isAntiPeepEnabled, setIsAntiPeepEnabled] = useState(false);
  const [isNumericKeypadOpen, setIsNumericKeypadOpen] = useState(false);
  const [numericPasscode, setNumericPasscode] = useState("1234");
  const [keypadInput, setKeypadInput] = useState("");
  const [keypadStep, setKeypadStep] = useState("enter_new"); // 'enter_new' | 'confirm_new'
  const [keypadTemp, setKeypadTemp] = useState("");

  // Auto-scroll ref for chat log
  const chatEndRef = useRef(null);

  // Auto connect simulation for Tactile page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsResonating(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // OTA firmware update simulation runner
  useEffect(() => {
    let interval;
    if (isOtaModalOpen && otaProgress < 100) {
      interval = setInterval(() => {
        setOtaProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 12) + 6;
          if (next >= 100) {
            clearInterval(interval);
            setFirmwareVersion("v2.2");
            setIsOtaCompleted(true);
            setTimeout(() => {
              setIsOtaModalOpen(false);
              showToast("固件已成功升级至 v2.2！设备已自动重启");
            }, 1200);
            return 100;
          }
          return next;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isOtaModalOpen, otaProgress]);



  // Simulate physical pressure sensor pulse (heartbeat/breathing between 25% and 85%)
  useEffect(() => {
    let interval;
    if (isPressureMode && !isManualOverride) {
      let time = 0;
      interval = setInterval(() => {
        time += 0.05;
        const wave = 55 + Math.sin(time * 2) * 30;
        setPressureValue(Math.max(0, Math.min(100, Math.round(wave))));
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPressureMode, isManualOverride]);

  // Auto scroll to chat bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, activeChatCharacter]);

  // Tab Switcher with Security intercept
  const handleTabChange = (tab) => {
    if (isPrivacyLockOn && tab === 'mine') {
      setIsLockScreenVisible(true);
      setCurrentGesture([]);
    } else {
      setCurrentTab(tab);
      if (tab === 'tactile') {
        setLinkedCharacter(null);
      }
    }
  };

  // Simulated Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!privacyAgreed) {
      showToast('请阅读并同意《用户协议》与《隐私政策》');
      return;
    }
    setIsLoggedIn(true);
    setCurrentTab('plaza');
  };

  // AI Draw Trigger (Free first time)
  const handleTriggerAiDraw = () => {
    if (generationTokens <= 0) return;
    setIsAiGenerating(true);
    setTimeout(() => {
      setGenerationTokens(0);
      setAiGeneratedAssets({
        avatar: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=150&auto=format&fit=crop",
        background: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
        card: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=300&auto=format&fit=crop"
      });
      setSelectedAvatarIdx(10);
      setSelectedBgIdx(10);
      setSelectedCardIdx(10);
      setIsAiGenerating(false);
      setHasUsedFreeDraw(true);
      showToast("✨ 专属梦境画卷已重塑！已自动套用预览");
    }, 3000);
  };

  // AI Redraw Trigger (Paid 10 Star Stones)
  const handleTriggerPaidAiDraw = () => {
    if (starStones < 10) return;
    setIsAiGenerating(true);
    setTimeout(() => {
      setStarStones(prev => Math.max(0, prev - 10));
      // Generate slightly different URLs to prove it refreshed!
      setAiGeneratedAssets({
        avatar: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=150&auto=format&fit=crop",
        background: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300&auto=format&fit=crop",
        card: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&auto=format&fit=crop"
      });
      setSelectedAvatarIdx(10);
      setSelectedBgIdx(10);
      setSelectedCardIdx(10);
      setIsAiGenerating(false);
      showToast("🔮 已消耗 10 梦境星石重塑画布！已自动应用");
    }, 3000);
  };

  // Recharge simulation handler
  const handleTriggerRecharge = (amount) => {
    showToast("💳 微信支付/支付宝安全链接唤醒中...");
    setTimeout(() => {
      setStarStones(prev => prev + amount);
      setShowRechargeDrawer(false);
      showToast(`✨ 补给成功！已存入 ${amount} 梦境星石`);
    }, 1500);
  };

  // Dream input Modal submission
  const handleCreateDream = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!dreamInput.trim()) return;

    const newDreamId = Date.now();
    const name = dreamCharName.trim() || "梦境分身";
    const age = dreamCharAge.trim() ? `${dreamCharAge.trim()}岁` : "22岁";
    const modelTag = dreamModel === 'normal' ? '浅层梦境' : '深层梦境';
    const customTagText = `${modelTag} · ${age}`;

    // Resolve customized visual assets (if index is 10, use AI asset)
    let finalAvatar = aiGeneratedAssets && selectedAvatarIdx === 10 ? aiGeneratedAssets.avatar : DEFAULT_AVATARS[selectedAvatarIdx];
    let finalBg = aiGeneratedAssets && selectedBgIdx === 10 ? aiGeneratedAssets.background : DEFAULT_BACKGROUNDS[selectedBgIdx];
    let finalCard = aiGeneratedAssets && selectedCardIdx === 10 ? aiGeneratedAssets.card : DEFAULT_CARDS[selectedCardIdx];

    // Create a new customized dream history card
    const newDream = {
      id: newDreamId,
      character: name,
      title: "新捕获梦境",
      tag: modelTag,
      desc: dreamInput,
      cover: finalBg,
      accumulated: 1,
      customTag: customTagText,
      avatar: finalAvatar,
      card: finalCard
    };

    setStories([newDream, ...stories]);
    
    // Seed initial chat history for the newly captured dream
    setChatMessages({
      ...chatMessages,
      [newDreamId]: [
        { id: 1, sender: 'character', text: `你好，我是你创造并唤醒的 ${name}。在这个新构造的梦境里，你有什么想对我说的吗？` }
      ]
    });

    // Reset input fields
    setDreamCharName('');
    setDreamCharAge('');
    setDreamCharTag('');
    setDreamInput('');
    setDreamModel('normal');
    setIsDreamModalOpen(false);
    setIsCanvasPageOpen(false);
    setAiGeneratedAssets(null);
    setGenerationTokens(1);
    setSelectedAvatarIdx(0);
    setSelectedBgIdx(0);
    setSelectedCardIdx(0);
    
    // Directly launch chat view for the newly created character
    handleOpenChat(newDream);
  };

  // Open Chat Room for specific character
  const handleOpenChat = (story, timelineId = null, badgeOverride = null) => {
    const resolvedTimelineId = timelineId || String(story.id);
    setActiveChatCharacter(story);
    setActiveChatTimelineId(resolvedTimelineId);
    setChatMode('dream'); // Defaults to left tab (智能梦境) when entering chat

    // Compute dynamic badge for the current timeline
    const charId = story.id;
    const allKeys = Object.keys(chatMessages)
      .filter(key => key === String(charId) || key.startsWith(String(charId) + '-'))
      .map(key => {
        const isDefault = key === String(charId);
        return { key, createdTime: isDefault ? 0 : Number(key.split('-')[1]) };
      })
      .sort((a, b) => a.createdTime - b.createdTime);

    const totalRounds = allKeys.length;
    const currentIndex = allKeys.findIndex(t => t.key === resolvedTimelineId);

    let badge = '梦境续写中...';
    if (badgeOverride) {
      badge = badgeOverride;
    } else if (totalRounds <= 1) {
      badge = '第 1 轮故事';
    } else if (currentIndex === totalRounds - 1) {
      badge = '新故事';
    } else {
      badge = `第 ${currentIndex + 1} 轮故事`;
    }
    setActiveChatBadge(badge);
  };

  // Close Chat Room
  const handleCloseChat = () => {
    setActiveChatCharacter(null);
    setActiveChatTimelineId(null);
    setActiveChatBadge('');
    setShowStatusMenu(false); // Clean up menu state on close
  };

  // Show toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? '' : prev);
    }, 2500);
  };



  // Helper to get character-specific quick replies
  const getQuickReplies = () => {
    if (!activeChatCharacter) return ["我想先靠近你一会儿", "能在梦里多留一会吗？"];
    const charId = activeChatCharacter.id;
    if (charId === 1) { // 林深
      return ["我想先靠近你一会儿", "感觉好些了，手好暖。"];
    } else if (charId === 2) { // 顾修
      return ["星空很美，想离你更近", "有你在，我就不害怕了。"];
    } else if (charId === 3) { // 沉白
      return ["听着你的心跳，很安心", "笨蛋，你也是。"];
    } else if (charId === 4) { // 司年
      return ["夕阳下的奶茶甜吗？", "我想和你去任何地方。"];
    }
    return ["我想先靠近你一会儿", "能在梦里多留一会吗？"];
  };

  // Send message inside Chat Room (reusable for shortcuts and form)
  const sendMessageText = (textToSend) => {
    if (!textToSend.trim() || !activeChatCharacter) return;

    const charId = activeChatCharacter.id;
    const timelineId = activeChatTimelineId || String(charId);
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    // Append user message
    const updatedMessages = [...(chatMessages[timelineId] || []), userMessage];
    setChatMessages(prev => ({
      ...prev,
      [timelineId]: updatedMessages
    }));

    // Trigger dynamic typing indicator
    setIsTyping(true);

    // Mock delayed response
    setTimeout(() => {
      let randomReply;
      
      // If custom character, dynamically generate text including the customized name
      if (charId > 4) {
        const name = activeChatCharacter.character;
        const customPool = [
          `闭上双眼，我是你刚才亲手描画的 ${name}。只要在你的意识里，我都陪着你。`,
          `梦里的寒意吹不进我们的屏障，我是 ${name}，我就守护在你的手边。`,
          `听到你呼唤 ${name} 这个名字，我的意识瞬间与你完成了共鸣。`,
          `无论你的梦境往何处延伸，作为你的专属守护，我都将倾听你的心跳。`
        ];
        randomReply = customPool[Math.floor(Math.random() * customPool.length)];
      } else {
        const charPool = CHARACTER_DIALOGUE_POOLS[charId] || CHARACTER_DIALOGUE_POOLS.generic;
        randomReply = charPool[Math.floor(Math.random() * charPool.length)];
      }
      
      const charReply = {
        id: Date.now() + 1,
        sender: 'character',
        text: randomReply
      };

      setChatMessages(prev => ({
        ...prev,
        [timelineId]: [...(prev[timelineId] || []), charReply]
      }));
      setIsTyping(false);
      
      // Update dialogue count in stories list
      setStories(prevStories => 
        prevStories.map(s => 
          s.id === charId ? { ...s, accumulated: s.accumulated + 2 } : s
        )
      );

    }, 1500);
  };

  // Send message from input submit form
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    sendMessageText(chatInputText);
    setChatInputText('');
  };

  // Circular drag handling helper for Tactile sliders
  const setupDragHandler = (type) => {
    const handleMove = (clientY, clientXRaw, clientYRaw, rect) => {
      const relativeY = clientYRaw - rect.top;
      const relativeX = clientXRaw - rect.left;
      let pct = 100 - (relativeY / rect.height) * 100;
      pct = Math.max(0, Math.min(100, Math.round(pct)));
      
      if (isPressureMode) {
        setIsManualOverride(true);
        if (overrideTimeoutRef.current) {
          clearTimeout(overrideTimeoutRef.current);
          overrideTimeoutRef.current = null;
        }
      }

      if (type === 'suck') {
        setSuckIntensity(pct);
        setSuckTouch({ x: relativeX, y: relativeY, active: true });
      } else {
        setVibrateIntensity(pct);
        setVibrateTouch({ x: relativeX, y: relativeY, active: true });
      }
    };

    const handleRelease = () => {
      if (type === 'suck') {
        setSuckTouch(prev => ({ ...prev, active: false }));
        setSuckAftershock(true);
        setTimeout(() => setSuckAftershock(false), 700);
      } else {
        setVibrateTouch(prev => ({ ...prev, active: false }));
        setVibeAftershock(true);
        setTimeout(() => setVibeAftershock(false), 700);
      }

      if (isPressureMode) {
        if (overrideTimeoutRef.current) {
          clearTimeout(overrideTimeoutRef.current);
        }
        overrideTimeoutRef.current = setTimeout(() => {
          setIsManualOverride(false);
        }, 3000);
      }
    };

    return {
      onMouseDown: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        handleMove(e.clientY, e.clientX, e.clientY, rect);
        
        const onMouseMove = (moveEvent) => {
          handleMove(moveEvent.clientY, moveEvent.clientX, moveEvent.clientY, rect);
        };
        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          handleRelease();
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      },
      onTouchStart: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (e.touches && e.touches[0]) {
          handleMove(e.touches[0].clientY, e.touches[0].clientX, e.touches[0].clientY, rect);
        }
      },
      onTouchMove: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (e.touches && e.touches[0]) {
          handleMove(e.touches[0].clientY, e.touches[0].clientX, e.touches[0].clientY, rect);
        }
      },
      onTouchEnd: () => {
        handleRelease();
      }
    };
  };

  // Nine-point Gesture lock node press helper
  const handleGesturePointClick = (num) => {
    if (!currentGesture.includes(num)) {
      const newGesture = [...currentGesture, num];
      setCurrentGesture(newGesture);
      
      // Trigger validation on 5 nodes
      if (newGesture.length === 5) {
        if (JSON.stringify(newGesture) === JSON.stringify(gesturePassword)) {
          setIsLockScreenVisible(false);
          setCurrentTab('mine');
        } else {
          setTimeout(() => {
            setCurrentGesture([]);
            showToast("密码轨迹错误，请绘制 L 型轨线");
          }, 400);
        }
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050309] flex items-center justify-center p-0 md:p-4 font-sans select-none overflow-hidden">
      
      {/* 手机单屏视口模拟器，绑定 .theme-light / .theme-dark 两个类名 */}
      <div className="w-full max-w-md h-[100dvh] md:h-[844px] bg-soulom-bg text-soulom-text flex flex-col justify-between overflow-hidden relative border border-gray-800 md:rounded-[40px] md:phone-bezel transition-all duration-300">
        
        {/* 全局毛玻璃提示语 */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-[#0B0713]/90 border border-white/10 rounded-full text-xs text-[#E5A995] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-[100] animate-bounce max-w-[80%] text-center font-sans">
            {toastMessage}
          </div>
        )}

        {/* 手机顶部状态栏 */}
        <div className="w-full h-8 px-6 pt-2 flex justify-between items-center text-xs text-gray-500 z-50 pointer-events-none select-none">
          <span>17:30</span>
          <div className="hidden md:block w-24 h-4 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-1.5 border border-gray-950"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 px-1 rounded-sm scale-90">5G</span>
            <Battery className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>

        {/* ========================================================
            页面：登录页 (Entry View)
            ======================================================== */}
        {!isLoggedIn && (
          <div className="flex-1 flex flex-col overflow-hidden z-10 transition-all duration-500 animate-fade-in relative">

            {/* ── 丝绸星河暗流光背景层 ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-[15%] left-[20%] w-64 h-64 rounded-full bg-purple-950/20 blur-[100px] animate-pulse-slow"></div>
              <div className="absolute bottom-[25%] right-[15%] w-72 h-72 rounded-full bg-violet-950/25 blur-[110px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-[45%] left-[55%] w-48 h-48 rounded-full bg-[#E5A995]/[0.04] blur-[80px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent bg-[size:4px_4px] animate-stardust" style={{ animationDuration: '12s' }}></div>
            </div>

            {/* ── 顶部 Brand LOGO 区域（垂直 1/3 处） ── */}
            <div className="flex flex-col items-center justify-center pt-20 pb-8 relative select-none">
              {/* 金属光晕 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#E5A995]/[0.06] rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#E5A995]/[0.08] rounded-full blur-xl"></div>
              <h1 className="font-serif text-[42px] tracking-[0.25em] text-[#E5A995] font-semibold drop-shadow-[0_2px_15px_rgba(229,169,149,0.3)] relative">
                SOULOM
              </h1>
              <p className="text-[11px] text-white/35 tracking-[0.15em] mt-3 font-light">
                让灵魂与触感，在梦境里共鸣。
              </p>
            </div>

            {/* ── 中部核心：双模式毛玻璃输入面板 ── */}
            <div className="flex-1 flex flex-col justify-center px-6">
              <div 
                style={{
                  backgroundColor: 'rgba(35, 21, 58, 0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
                className="w-full rounded-3xl p-5 pt-4 border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                {/* 模式切换 Tab */}
                <div className="flex items-center justify-center gap-8 mb-5 relative">
                  <button
                    type="button"
                    onClick={() => setLoginMode('code')}
                    className={`text-[13px] pb-2 tracking-wider transition-all duration-300 relative cursor-pointer ${
                      loginMode === 'code'
                        ? 'text-[#F8F9FA] font-medium'
                        : 'text-white/35 font-light hover:text-white/55'
                    }`}
                  >
                    验证码登录
                    {loginMode === 'code' && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-[#E5A995]/60 via-[#E5A995] to-[#E5A995]/60 rounded-full shadow-[0_0_8px_rgba(229,169,149,0.4)] transition-all"></span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMode('password')}
                    className={`text-[13px] pb-2 tracking-wider transition-all duration-300 relative cursor-pointer ${
                      loginMode === 'password'
                        ? 'text-[#F8F9FA] font-medium'
                        : 'text-white/35 font-light hover:text-white/55'
                    }`}
                  >
                    账号密码
                    {loginMode === 'password' && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-[#E5A995]/60 via-[#E5A995] to-[#E5A995]/60 rounded-full shadow-[0_0_8px_rgba(229,169,149,0.4)] transition-all"></span>
                    )}
                  </button>
                </div>

                {/* 输入框区域 */}
                <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
                  {loginMode === 'code' ? (
                    /* ── 验证码模式 ── */
                    <div className="flex flex-col gap-3.5 animate-fade-in" key="code-mode">
                      <input 
                        type="tel" 
                        placeholder="输入手机号 / 邮箱" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl text-sm focus:outline-none placeholder-white/25 text-[#F8F9FA] transition-all duration-300 border border-white/[0.08] focus:border-[#E5A995]/40 focus:shadow-[0_0_10px_rgba(229,169,149,0.1)]"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      />
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="输入验证码" 
                          required
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value)}
                          className="w-full h-12 px-4 pr-28 rounded-xl text-sm focus:outline-none placeholder-white/25 text-[#F8F9FA] transition-all duration-300 border border-white/[0.08] focus:border-[#E5A995]/40 focus:shadow-[0_0_10px_rgba(229,169,149,0.1)]"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        />
                        <button 
                          type="button"
                          onClick={() => showToast('验证码已发送至您的手机')}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-3.5 rounded-lg text-[11px] text-[#E5A995] tracking-wider font-medium transition-all active:scale-95 cursor-pointer border border-[#E5A995]/20 hover:border-[#E5A995]/40"
                          style={{ backgroundColor: 'rgba(229, 169, 149, 0.08)' }}
                        >
                          获取验证码
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── 账号密码模式 ── */
                    <div className="flex flex-col gap-3.5 animate-fade-in" key="password-mode">
                      <input 
                        type="text" 
                        placeholder="输入你的共鸣账号..." 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl text-sm focus:outline-none placeholder-white/25 text-[#F8F9FA] transition-all duration-300 border border-white/[0.08] focus:border-[#E5A995]/40 focus:shadow-[0_0_10px_rgba(229,169,149,0.1)]"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      />
                      <div className="relative">
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="输入私密密码" 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-12 px-4 pr-12 rounded-xl text-sm focus:outline-none placeholder-white/25 text-[#F8F9FA] transition-all duration-300 border border-white/[0.08] focus:border-[#E5A995]/40 focus:shadow-[0_0_10px_rgba(229,169,149,0.1)]"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50 p-1 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── 心动启航大按钮 ── */}
                  <button 
                    type="submit" 
                    className="w-full h-12 mt-3 rounded-full text-[15px] font-medium text-white tracking-wider active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(229,169,149,0.2)] hover:shadow-[0_4px_25px_rgba(229,169,149,0.35)] cursor-pointer border-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(229,169,149,0.8) 0%, rgba(212,163,115,0.8) 100%)'
                    }}
                  >
                    开启心动梦境
                  </button>
                </form>
              </div>

              {/* ── 隐私安全背书栏 ── */}
              <div className="flex flex-col items-center mt-5 gap-2.5 px-2">
                {/* 第一行：用户协议勾选 */}
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <button
                    type="button"
                    onClick={() => setPrivacyAgreed(!privacyAgreed)}
                    className={`w-[15px] h-[15px] rounded flex-shrink-0 flex items-center justify-center transition-all duration-200 border ${
                      privacyAgreed
                        ? 'bg-[#E5A995]/80 border-[#E5A995]/60'
                        : 'bg-white/5 border-white/15 hover:border-white/30'
                    }`}
                  >
                    {privacyAgreed && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <span className="text-[11px] text-white/35 font-light tracking-wide">
                    已阅读并同意
                    <span className="text-[#E5A995]/70 hover:text-[#E5A995] cursor-pointer transition-colors mx-0.5">《用户协议》</span>
                    与
                    <span className="text-[#E5A995]/70 hover:text-[#E5A995] cursor-pointer transition-colors mx-0.5">《隐私政策》</span>
                  </span>
                </label>

                {/* 第二行：匿名加密承诺 */}
                <p className="text-[10px] text-white/25 font-light tracking-wider flex items-center gap-1 text-center leading-relaxed">
                  <span className="text-[#E5A995]/50 text-[11px]">🔒</span>
                  <span className="text-[#E5A995]/40">匿名加密保护</span>
                  <span className="text-white/15">·</span>
                  <span>平台绝不发送任何含产品敏感字样的服务短信</span>
                </p>
              </div>
            </div>

            {/* 底部留白 */}
            <div className="h-8 flex-shrink-0"></div>
          </div>
        )}

        {/* ========================================================
            主应用视图 (Main Application Frame)
            ======================================================== */}
        {isLoggedIn && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
            
            {/* 顶部粘性导航栏 Sticky Header */}
            {!activeChatCharacter && (
              <header className="sticky top-0 w-full h-14 px-4 flex justify-between items-center border-b border-soulom-headerBorder bg-soulom-headerBg backdrop-blur-md z-40">
                <h2 
                  onClick={() => {
                    if (currentTab === 'plaza' || currentTab === 'dreams') {
                      setCurrentTab('plaza');
                    }
                  }}
                  className="font-serif text-xl font-semibold tracking-wider text-[#E5A995] cursor-pointer drop-shadow-sm select-none"
                >
                  {currentTab === 'plaza' || currentTab === 'dreams' ? 'Soulom' : (currentTab === 'tactile' ? '触觉中心' : '个人中心')}
                </h2>
                
                {/* 顶部右侧控制区 - 精准清洗 */}
                {(currentTab === 'plaza' || currentTab === 'dreams') ? (
                  <button 
                    type="button"
                    onClick={() => showToast("搜索功能正在梦境中重构...")}
                    className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/5 active:scale-95 transition-all text-[#E5A995]/85 hover:text-[#E5A995]"
                  >
                    <Search className="w-4.5 h-4.5 stroke-[1.5]" />
                  </button>
                ) : null}
              </header>
            )}

            {/* ========================================================
                子视图：角色聊天框页面 (ChatView)
                ======================================================== */}
            {activeChatCharacter && (
              <div 
                style={{ 
                  backgroundImage: `url(${activeChatCharacter.cover || activeChatCharacter.avatar})` 
                }}
                className="flex-1 flex flex-col justify-between overflow-hidden bg-cover bg-center h-screen z-49 animate-fade-in relative"
              >
                {/* 全屏、极淡的遮罩层 */}
                <div className="backdrop-blur-[2px] bg-[#0B0713]/30 absolute inset-0 -z-10"></div>
                
                {/* 聊天顶部导航 (极简单行两列) */}
                <header className="flex justify-between items-center px-4 h-12 bg-transparent w-full relative z-50 select-none">
                  {/* 左侧：角色信息 */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleCloseChat}
                      className="p-1 -ml-1 text-soulom-muted hover:text-soulom-text active:scale-90 transition-transform flex-shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E5A995]/30 flex-shrink-0">
                        <img src={activeChatCharacter.avatar} alt={activeChatCharacter.character} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[22px] font-serif font-medium text-[#F8F9FA] leading-none">{activeChatCharacter.character}</span>
                        <span className="text-[12px] text-[#E5A995] font-light font-sans mt-0.5">
                          《{activeChatCharacter.title}》· {activeChatBadge || '梦境续写中...'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 右侧：设备连接状态 */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all cursor-pointer text-xs font-light text-[#F8F9FA] select-none whitespace-nowrap"
                    >
                      <span 
                        style={{ backgroundColor: isResonating ? '#E5A995' : '#64748B' }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 flex-shrink-0 ${
                          isResonating 
                            ? 'shadow-[0_0_6px_#E5A995]' 
                            : 'animate-pulse'
                        }`}
                      />
                      <span className="text-xs font-sans tracking-wide font-light whitespace-nowrap">
                        {isResonating ? '触感已同步 | 电量 88%' : '灵魂共鸣中...'}
                      </span>
                    </button>
                    
                    {showStatusMenu && (
                      <div className="absolute right-0 mt-2 w-32 bg-[#0B0713]/95 border border-white/10 backdrop-blur-md rounded-xl shadow-xl z-[60] overflow-hidden animate-fade-in">
                        <button 
                          onClick={() => {
                            setIsResonating(!isResonating);
                            setShowStatusMenu(false);
                            showToast(isResonating ? '已断开与设备的触感同步' : '已成功建立设备连接，触感已同步');
                          }}
                          className="w-full px-3 py-2.5 text-left text-[11px] text-[#E5A995] hover:bg-white/5 active:bg-white/10 transition-colors font-sans border-0 cursor-pointer"
                        >
                          {isResonating ? '断开设备连接' : '连接设备'}
                        </button>
                      </div>
                    )}
                  </div>
                </header>

                {/* 顶部场景切换 Tab (智能梦境 vs 共鸣剧场) */}
                <div className="flex justify-center items-center gap-6 my-2 z-40 select-none">
                  {/* 左侧选项：智能梦境 */}
                  <button
                    type="button"
                    onClick={() => setChatMode('dream')}
                    className={`text-xs px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 font-medium whitespace-nowrap cursor-pointer ${
                      chatMode === 'dream'
                        ? 'bg-white/10 border-white/20 text-[#F8F9FA] shadow-[0_2px_10px_rgba(255,255,255,0.05)]'
                        : 'bg-transparent border-transparent text-[#F8F9FA]/40 hover:text-[#F8F9FA]/70'
                    }`}
                  >
                    🌙 智能梦境
                  </button>

                  {/* 右侧选项：共鸣剧场 (带硬件连接权限拦截) */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!isResonating) {
                        showToast("请先连接设备，解锁触感共鸣剧场");
                        return;
                      }
                      setChatMode('theater');
                      setLinkedCharacter(activeChatCharacter);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 font-medium whitespace-nowrap ${
                      !isResonating
                        ? 'bg-transparent border-transparent text-[#E5A995]/40 opacity-40 cursor-not-allowed'
                        : chatMode === 'theater'
                          ? 'bg-white/10 border-[#E5A995]/30 text-[#E5A995] shadow-[0_0_10px_rgba(225,169,149,0.3)] cursor-pointer'
                          : 'bg-transparent border-transparent text-[#E5A995] hover:text-[#E5A995]/80 cursor-pointer'
                    }`}
                  >
                    {isResonating ? '✨ 共鸣剧场' : '🔒 共鸣剧场'}
                  </button>
                </div>

                {/* 聊天对话气泡区 (使用透明背景以便显示大气的背景图) */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-transparent">
                  
                  {(() => {
                    const timelineId = activeChatTimelineId || String(activeChatCharacter.id);
                    const msgList = chatMessages[timelineId] || [];
                    return (
                      <>
                        {msgList.map((msg, index) => {
                          const isUser = msg.sender === 'user';
                          const isConsecutive = index > 0 && msgList[index - 1].sender === msg.sender;
                          const showAvatar = !isUser && !isConsecutive;

                          return (
                            <div 
                              key={msg.id}
                              className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto justify-end' : 'mr-auto'}`}
                            >
                              {/* 头像 - 只在男主非连续说话时显示，用户不显示 */}
                              {showAvatar && (
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E5A995]/20 flex-shrink-0 select-none">
                                  <img 
                                    src={activeChatCharacter.avatar} 
                                    alt={activeChatCharacter.character} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}

                              {/* 气泡 - 整体字号放大为 text-base 与 leading-relaxed 行高，移除所有彩色外框线 */}
                              <div 
                                style={!isUser ? { backgroundColor: 'rgba(35, 21, 58, 0.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } : undefined}
                                className={`p-3.5 text-base leading-relaxed transition-all relative font-light shadow-none ${
                                  isUser 
                                    ? 'bg-gradient-to-r from-[#E5A995]/20 to-[#D4A373]/20 backdrop-blur-md text-[#F8F9FA] rounded-2xl rounded-tr-sm border-0'
                                    : 'text-soulom-text rounded-2xl rounded-tl-sm border-0'
                                }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          );
                        })}

                        {/* 正在输入状态指示器 */}
                        {isTyping && (() => {
                          const lastIsBot = msgList.length > 0 && msgList[msgList.length - 1].sender !== 'user';
                          const showTypingAvatar = !lastIsBot;
                          return (
                            <div className="flex gap-2.5 max-w-[80%] mr-auto items-center">
                              {showTypingAvatar && (
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E5A995]/20 flex-shrink-0 select-none">
                                  <img src={activeChatCharacter.avatar} alt={activeChatCharacter.character} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div 
                                style={{ backgroundColor: 'rgba(35, 21, 58, 0.4)' }}
                                className="px-3.5 py-2.5 text-soulom-muted text-xs flex items-center gap-1 tracking-wider font-light backdrop-blur-md rounded-2xl rounded-tl-sm border-0"
                              >
                                <span className="animate-pulse">{activeChatCharacter.character} 正在输入</span>
                                <span className="flex gap-0.5 items-center pl-1">
                                  <span className="w-1 h-1 bg-[#E5A995] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                  <span className="w-1 h-1 bg-[#E5A995] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                  <span className="w-1 h-1 bg-[#E5A995] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </span>
                              </div>
                            </div>
                          );
                        })()}
                      </>
                    );
                  })()}

                  <div ref={chatEndRef} />
                </div>

                {/* 底部输入及快捷栏 (完全透明背景，智能梦境 vs 共鸣剧场大变脸) */}
                <div className="bg-transparent pb-safe-bottom z-40">
                  
                  {/* 智能梦境模式下的快捷提示词气泡 */}
                  {chatMode === 'dream' && (
                    <div 
                      className={`flex gap-4 px-4 select-none justify-center my-4 transition-all duration-300 ${
                        showQuickReplies ? 'opacity-100 max-h-16 visible' : 'opacity-0 max-h-0 invisible overflow-hidden my-0'
                      }`}
                    >
                      {getQuickReplies().map((text, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessageText(text)}
                          style={{
                            boxShadow: '0 0 12px rgba(255, 255, 255, 0.05)'
                          }}
                          className="px-5 py-3 text-sm text-[#F8F9FA] font-medium tracking-wide bg-white/[0.05] backdrop-blur-md rounded-full active:scale-95 transition-all duration-200 cursor-pointer animate-pulse border-0 hover:bg-white/[0.1]"
                        >
                          ✨ {text}
                        </button>
                      ))}
                    </div>
                  )}

                  {chatMode === 'dream' ? (
                    /* ── 智能梦境模式：纯净四轨底栏 [💬] [🔊] [输入框] [🚀] ── */
                    <form 
                      onSubmit={handleSendMessage} 
                      className="relative flex items-center gap-3 w-full bg-transparent px-4 pb-4 select-none animate-fade-in"
                    >
                      {/* 第 1 轨：提示词气泡开关 */}
                      <button
                        type="button"
                        onClick={() => setShowQuickReplies(!showQuickReplies)}
                        className={`w-[34px] h-[34px] rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 active:scale-90 transition-all cursor-pointer flex-shrink-0 ${
                          showQuickReplies ? 'text-[#E5A995] border-[#E5A995]/30' : 'text-soulom-muted'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      {/* 第 2 轨：语音播放开关键 */}
                      <button
                        type="button"
                        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                        className={`w-[34px] h-[34px] rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 active:scale-90 transition-all cursor-pointer flex-shrink-0 ${
                          isAudioEnabled ? 'text-[#F8F9FA]' : 'text-white/40 border-white/10 opacity-40'
                        }`}
                      >
                        {isAudioEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
                      </button>

                      {/* 第 3 轨：主文本输入框（自适应占据剩余空间） */}
                      <input 
                        type="text"
                        placeholder="输入回应，与他共鸣..."
                        value={chatInputText}
                        onChange={(e) => setChatInputText(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)'
                        }}
                        className="flex-1 min-w-0 h-[34px] px-3.5 rounded-full border border-white/[0.08] focus:border-white/[0.2] text-[14px] focus:outline-none placeholder-white/30 text-[#F8F9FA] transition-all"
                      />

                      {/* 第 4 轨：发送按钮（最右侧唯一图标） */}
                      <button 
                        type="submit"
                        disabled={!chatInputText.trim() || isTyping}
                        className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                          chatInputText.trim() && !isTyping
                            ? 'bg-[#E5A995] text-[#0B0713] active:scale-95 shadow-[0_2px_8px_rgba(229,169,149,0.25)] border-0 cursor-pointer' 
                            : 'bg-white/[0.06] text-soulom-muted border border-white/[0.12]'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    /* ── 共鸣剧场模式：三选一分支卡片 + 底部音频状态 ── */
                    <div className="flex flex-col gap-2.5 w-full px-6 pb-4 select-none animate-fade-in">
                      <button
                        type="button"
                        onClick={() => sendMessageText("听着你的心跳，很安心。")}
                        className="w-full h-11 rounded-xl bg-[#E5A995]/10 backdrop-blur-md border border-[#E5A995]/20 flex items-center justify-center text-sm text-[#F8F9FA] active:scale-98 transition-all cursor-pointer font-light hover:bg-[#E5A995]/20"
                      >
                        听着你的心跳，很安心。
                      </button>
                      <button
                        type="button"
                        onClick={() => sendMessageText("能在梦里多留一会吗？")}
                        className="w-full h-11 rounded-xl bg-[#E5A995]/10 backdrop-blur-md border border-[#E5A995]/20 flex items-center justify-center text-sm text-[#F8F9FA] active:scale-98 transition-all cursor-pointer font-light hover:bg-[#E5A995]/20"
                      >
                        能在梦里多留一会吗？
                      </button>
                      <button
                        type="button"
                        onClick={() => sendMessageText("我想先靠近你一会儿")}
                        className="w-full h-11 rounded-xl bg-[#E5A995]/10 backdrop-blur-md border border-[#E5A995]/20 flex items-center justify-center text-sm text-[#F8F9FA] active:scale-98 transition-all cursor-pointer font-light hover:bg-[#E5A995]/20"
                      >
                        我想先靠近你一会儿
                      </button>

                      {/* 底部：仅保留 🔊 语音播放状态指示 */}
                      <div className="flex items-center mt-1">
                        <button
                          type="button"
                          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                          className={`w-[32px] h-[32px] rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 active:scale-90 transition-all cursor-pointer ${
                            isAudioEnabled ? 'text-[#F8F9FA]' : 'text-white/40 border-white/10 opacity-40'
                          }`}
                        >
                          {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </button>
                        <span className="text-[10px] text-soulom-muted pl-2 tracking-wider font-light">
                          {isAudioEnabled ? '官方录音播放中' : '静音状态'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 2: 旧日梦境档案馆 (DreamsArchiveView)
                ======================================================== */}
            {currentTab === 'dreams' && !activeChatCharacter && (
              <div className="flex-1 flex flex-col overflow-hidden relative px-4 pt-3">
                {/* 档案馆标题与描述 */}
                <div className="flex flex-col gap-1 mb-3 pr-2 flex-shrink-0">
                  <h3 className="font-serif text-lg text-[#E5A995] font-semibold tracking-wider flex items-center gap-2">
                    <History className="w-5 h-5 text-[#E5A995]" />
                    <span>旧日梦境档案馆</span>
                  </h3>
                  <p className="text-[10px] text-soulom-muted font-light tracking-wide leading-relaxed">
                    收录所有共鸣角色的多轮次对话记忆，点选即可重回彼时的心动梦境。
                  </p>
                </div>

                {/* 历史记录总表 */}
                <div className="flex-1 overflow-y-auto pb-20 pr-0.5 space-y-3 scrollbar-thin">
                  {(() => {
                    // Gather timelines from ALL characters
                    const allTimelines = [];
                    stories.forEach((story) => {
                      const charId = story.id;
                      const charTimelines = Object.keys(chatMessages)
                        .filter(key => key === String(charId) || key.startsWith(String(charId) + '-'))
                        .map(key => {
                          const msgs = chatMessages[key] || [];
                          const lastMsg = msgs[msgs.length - 1] || null;
                          const isDefault = key === String(charId);
                          const createdTime = isDefault ? 0 : Number(key.split('-')[1]);
                          let lastUpdated = createdTime;
                          if (lastMsg && lastMsg.id > 100000) {
                            lastUpdated = lastMsg.id;
                          } else {
                            lastUpdated = isDefault ? Date.now() - 3 * 24 * 3600 * 1000 : createdTime;
                          }
                          return {
                            story,
                            timelineId: key,
                            createdTime,
                            lastUpdated,
                            lastMessage: lastMsg,
                          };
                        });
                      
                      // Sort ascending to assign badges
                      charTimelines.sort((a, b) => a.createdTime - b.createdTime);
                      charTimelines.forEach((t, idx) => {
                        let badge = `第 ${idx + 1} 轮故事`;
                        if (idx === charTimelines.length - 1 && charTimelines.length > 1) {
                          badge = "新故事";
                        } else if (charTimelines.length === 1) {
                          badge = "第 1 轮故事";
                        }
                        allTimelines.push({ ...t, badge });
                      });
                    });

                    // Sort ALL timelines descending by last updated
                    allTimelines.sort((a, b) => b.lastUpdated - a.lastUpdated);

                    if (allTimelines.length === 0) {
                      return (
                        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                          <History className="w-8 h-8 text-white/20" />
                          <span className="text-xs text-soulom-muted font-light">暂无任何梦境故事记录</span>
                        </div>
                      );
                    }

                    return allTimelines.map((timeline) => {
                      const lastMsgText = timeline.lastMessage 
                        ? (timeline.lastMessage.sender === 'user' ? '我：' : `${timeline.story.character}：`) + timeline.lastMessage.text 
                        : '无对话记录';
                      return (
                        <div 
                          key={timeline.timelineId}
                          onClick={() => handleOpenChat(timeline.story, timeline.timelineId)}
                          style={{
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                          }}
                          className="w-full rounded-2xl bg-[#23153A]/40 border border-white/5 backdrop-blur-md p-4 flex flex-col gap-3 cursor-pointer transition-all active:scale-[0.99] hover:border-[#E5A995]/20 select-none text-left flex-shrink-0 group"
                        >
                          {/* Row 1: Avatar, Character Title, and Time Ago */}
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E5A995]/20 flex-shrink-0">
                                <img 
                                  src={timeline.story.avatar} 
                                  alt={timeline.story.character} 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <span className="font-serif text-[13px] text-[#F8F9FA] font-medium">
                                {timeline.story.character} · {timeline.story.title}
                              </span>
                            </div>
                            <span className="text-[10px] text-white/30 font-light font-sans flex-shrink-0">
                              {formatTimeAgo(timeline.lastUpdated)}
                            </span>
                          </div>

                          {/* Row 2: Badge and Dialogue Text */}
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-medium tracking-wide bg-[#E5A995]/15 border border-[#E5A995]/30 text-[#E5A995] shadow-[0_0_8px_rgba(229,169,149,0.15)] animate-pulse-slow">
                                {timeline.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-soulom-muted line-clamp-2 leading-relaxed font-light mt-0.5">
                              {lastMsgText}
                            </p>
                          </div>

                          {/* Row 3: Action Buttons (Bottom border-t and right-aligned button) */}
                          <div className="flex justify-end items-center mt-1 pt-2 border-t border-white/5 w-full">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenChat(timeline.story, timeline.timelineId);
                              }}
                              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#E5A995]/30 text-[#E5A995] text-[10px] flex items-center gap-1 hover:glow-border active:scale-95 transition-all font-medium shadow-[0_0_8px_rgba(229,169,149,0.15)]"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-[#E5A995]" />
                              <span>续写梦境</span>
                            </button>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 1: 故事广场 (PlazaView)
                ======================================================== */}
            {currentTab === 'plaza' && !activeChatCharacter && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden relative px-4 pt-3">
                {/* 剧本卡片瀑布流 */}
                <div className="flex-1 overflow-y-auto pb-20 pr-0.5 space-y-5 h-[calc(100vh-180px)]">
                  {stories.map((story) => (
                    <div 
                      key={story.id} 
                      onClick={() => setTimelineDrawerStory(story)}
                      className="w-full aspect-[3/4] relative rounded-3xl overflow-hidden glass-panel group transition-transform duration-300 hover:scale-[0.99] cursor-pointer"
                    >
                      {/* 背景海报图片 */}
                      <div className="w-full h-full relative">
                        <img 
                          src={story.cover} 
                          alt={story.title} 
                          className="w-full h-full object-cover feather-mask transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-soulom-bg via-transparent to-transparent opacity-95"></div>
                      </div>

                      {/* 卡片左上角角色名小气泡 */}
                      <div className="absolute top-4 left-4 py-1 px-3.5 rounded-full bg-black/40 backdrop-blur-md border border-[#E5A995]/20 text-[10px] tracking-wider text-[#E5A995] font-light">
                        {story.character}
                      </div>

                      {/* 卡片底部文本 - 适配浅色模式，使用全局主题文字变量 */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1.5">
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-serif text-lg text-soulom-text font-medium tracking-wide">
                            {story.title}
                          </h3>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#E5A995]/10 border border-[#E5A995]/25 text-[#E5A995] scale-90">
                            {story.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-soulom-muted line-clamp-2 leading-relaxed tracking-wide font-light">
                          {story.desc}
                        </p>
                        
                        {/* 互动动作 */}
                        <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-500/20 text-[10px]">
                          <span className="text-soulom-muted font-light">共鸣分身: {story.customTag}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setTimelineDrawerStory(story);
                            }}
                            className="text-[#E5A995] flex items-center gap-1 hover:underline active:scale-95 transition-transform"
                          >
                            <Sparkles className="w-3 h-3 text-[#E5A995]" /> 立即续写梦境
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 底部悬浮操作栏 */}
                <div className="absolute bottom-4 left-4 right-4 z-30">
                  <button 
                    onClick={() => setIsDreamModalOpen(true)}
                    className="w-full h-12 flex items-center justify-center gap-2 glass-panel hover:glow-border rounded-full text-xs tracking-widest text-[#E5A995] hover:bg-soulom-panel active:scale-95 transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4 text-[#E5A995] animate-pulse-slow" /> 
                    <span>捕 获 今 晚 的 心 动 梦 境</span>
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 3: 触觉中心 (TactileView)
                ======================================================== */}
            {currentTab === 'tactile' && !activeChatCharacter && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden relative pt-4 pb-4 px-0 bg-[#0B0713]">
                
                {/* 1. 星尘慢速呼吸背景 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0B0713]">
                  {/* 星尘慢速呼吸漫射光晕 */}
                  <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-950/15 blur-[90px] animate-pulse-slow"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-violet-950/20 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent bg-[size:5px_5px] animate-stardust animate-pulse" style={{ animationDuration: '4000ms' }}></div>
                </div>

                {/* 2. 顶部 Header 切换器 */}
                <div className="flex justify-center bg-[#1F1635]/60 p-1 rounded-full mx-5 my-3 z-10 border border-white/5 select-none backdrop-blur-md">
                  <button
                    onClick={() => {
                      setResonanceTab('solo');
                      setLinkedCharacter(null);
                    }}
                    className={`flex-1 text-center py-1.5 rounded-full text-xs font-light tracking-wide transition-all ${
                      resonanceTab === 'solo' 
                        ? 'bg-white/10 text-white shadow-[0_2px_8px_rgba(255,255,255,0.05)] border border-white/10 font-normal' 
                        : 'text-white/40 hover:text-white/70 border border-transparent'
                    }`}
                  >
                    🌙 独立悦己模式
                  </button>
                  <button
                    onClick={() => {
                      setResonanceTab('link');
                      if (!linkedCharacter) {
                        setLinkedCharacter(stories && stories[0] ? stories[0] : null);
                      }
                    }}
                    className={`flex-1 text-center py-1.5 rounded-full text-xs font-light tracking-wide transition-all ${
                      resonanceTab === 'link' 
                        ? 'bg-white/10 text-white shadow-[0_2px_8px_rgba(255,255,255,0.05)] border border-white/10 font-normal' 
                        : 'text-white/40 hover:text-white/70 border border-transparent'
                    }`}
                  >
                    ✨ 剧本共鸣联动
                  </button>
                </div>

                {/* 2.5 动态剧本选择抽屉 (Aura Playlet Selector) */}
                <div 
                  className={`transition-all duration-300 ease-out select-none flex flex-col justify-center ${
                    resonanceTab === 'link' 
                      ? 'max-h-20 opacity-100 mt-1 mb-2.5' 
                      : 'max-h-0 opacity-0 pointer-events-none overflow-hidden my-0'
                  }`}
                  style={{ display: resonanceTab === 'link' ? 'block' : 'none' }}
                >
                  <div className="flex overflow-x-auto gap-3 px-5 py-1 scrollbar-none whitespace-nowrap">
                    {stories && stories.map((story) => {
                      const isSelected = linkedCharacter && linkedCharacter.id === story.id;
                      
                      // Character specific card styling gradient
                      let cardBgGradient = 'from-white/5 to-white/10';
                      if (story.id === 1) cardBgGradient = 'from-[#2E141D]/40 to-[#5A2938]/40';
                      else if (story.id === 2) cardBgGradient = 'from-[#0B132A]/40 to-[#1D2D44]/40';
                      else if (story.id === 3) cardBgGradient = 'from-[#0A1C20]/40 to-[#104F55]/40';
                      else if (story.id === 4) cardBgGradient = 'from-[#261C14]/40 to-[#4D3A29]/40';

                      return (
                        <div
                          key={story.id}
                          onClick={() => {
                            setLinkedCharacter(story);
                            showToast(`已切换共鸣剧场角色为: ${story.character}`);
                          }}
                          className={`w-[110px] h-[64px] rounded-xl flex flex-col justify-between p-2 relative overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-300 backdrop-blur-md bg-gradient-to-br ${cardBgGradient} ${
                            isSelected 
                              ? 'border-2 border-[#E5A995] scale-[1.03] shadow-[0_0_12px_rgba(229,169,149,0.35)] opacity-100 animate-pulse' 
                              : 'border border-white/10 opacity-50 hover:opacity-80'
                          }`}
                        >
                          {/* 抽象半身像剪影背景 */}
                          <div className="absolute inset-0 opacity-15 pointer-events-none flex justify-center items-end pb-1">
                            <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#E5A995] fill-current">
                              <circle cx="50" cy="35" r="14" />
                              <path d="M 22 90 Q 22 62 50 62 Q 78 62 78 90 Z" />
                            </svg>
                          </div>
                          
                          {/* 边缘遮罩 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0713]/60 via-transparent to-transparent pointer-events-none"></div>

                          {/* 顶部微光装饰 */}
                          <div className="w-full flex justify-between items-center z-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A995]/50"></span>
                            <span className="text-[7px] text-white/30 tracking-widest font-mono">SOULOM</span>
                          </div>

                          {/* 底部优雅小字 */}
                          <span className="font-sans text-[9px] text-[#F8F9FA]/90 font-light truncate drop-shadow-md z-10 text-center w-full">
                            {story.character} · {story.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. 设备蓝牙连接管理卡 */}
                <div className="h-[54px] mx-5 bg-[#251B40]/40 backdrop-blur-md rounded-xl flex justify-between items-center px-4 border border-white/5 z-10 flex-shrink-0 mb-3 select-none">
                  <div className="flex items-center gap-2">
                    {/* Bluetooth Icon */}
                    <Bluetooth className={`w-4 h-4 transition-all duration-500 ${isResonating ? 'text-[#E5A995] animate-pulse' : 'text-white/20'}`} />
                    
                    {/* Soft blinking breathing dot */}
                    <span className="relative flex h-2 w-2 flex-shrink-0">
                      {isResonating && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-2 w-2 transition-all duration-500 ${isResonating ? 'bg-emerald-500 shadow-[0_0_6px_#10B981]' : 'bg-red-500 shadow-[0_0_6px_#EF4444]'}`}></span>
                    </span>
                    
                    <div className="flex items-center flex-wrap gap-x-1.5">
                      <span className="text-[11px] font-light text-white/80 tracking-wide whitespace-nowrap">
                        {isResonating 
                          ? 'Soulom 设备已连接 | 🔋 电量 88%' 
                          : 'Soulom 设备连接已断开'}
                      </span>
                      {firmwareVersion === "v2.1" && isResonating && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsOtaModalOpen(true);
                            setOtaProgress(0);
                            setIsOtaCompleted(false);
                          }}
                          className="text-[9px] font-medium text-[#E5A995] bg-[#E5A995]/15 border border-[#E5A995]/30 px-1.5 py-0.5 rounded-md animate-pulse cursor-pointer whitespace-nowrap shadow-[0_0_8px_rgba(229,169,149,0.25)]"
                        >
                          🌟 固件升级 v2.2
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsResonating(!isResonating);
                      showToast(isResonating ? "已断开与设备的触感同步" : "已成功建立设备连接，触感已同步");
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] bg-white/10 text-white hover:bg-white/15 active:scale-95 transition-all border border-white/10 cursor-pointer flex-shrink-0"
                  >
                    {isResonating ? '断开连接' : '重连设备'}
                  </button>
                </div>

                {/* 4. 中央双轨立体流体光瀑 */}
                <div className="flex-1 mx-5 flex justify-between items-stretch gap-4 mb-3.5 min-h-[260px] relative z-10 select-none">
                  
                  {/* Left & Right Character-linked Gradients calculation */}
                  {(() => {
                    const currentSuck = isPressureMode && !isManualOverride ? pressureValue : suckIntensity;
                    const suckWobbleScale = 5 + (currentSuck / 100) * 35;
                    const suckWobbleFreq = 0.01 + (currentSuck / 100) * 0.03;
                    
                    const currentVibe = isPressureMode && !isManualOverride ? pressureValue : vibrateIntensity;
                    const vibeWobbleScale = 5 + (currentVibe / 100) * 35;
                    const vibeWobbleFreq = 0.01 + (currentVibe / 100) * 0.03;

                    // Dynamically dye colors based on selected linkedCharacter
                    const colors = (() => {
                      if (resonanceTab !== 'link' || !linkedCharacter) {
                        // Solo Mode Colors (Rose Gold & Violet)
                        return {
                          suckGradStart: "#0B0713",
                          suckGradMid1: "#4C1D95",
                          suckGradMid2: "#8B5CF6",
                          suckGradEnd: "#E5A995",
                          vibeGradStart: "#0B0713",
                          vibeGradMid1: "#3B0D80",
                          vibeGradMid2: "#4F46E5",
                          vibeGradEnd: "#7C3AED",
                          glowColor: null
                        };
                      }
                      switch (linkedCharacter.id) {
                        case 1: // 林深 -> Pearl Warm Pink
                          return {
                            suckGradStart: "#2A141D",
                            suckGradMid1: "#5A2938",
                            suckGradMid2: "#A84460",
                            suckGradEnd: "#FFC0CB",
                            vibeGradStart: "#2D1621",
                            vibeGradMid1: "#6E2D42",
                            vibeGradMid2: "#C95B7E",
                            vibeGradEnd: "#FDA4AF",
                            glowColor: "#FFC0CB"
                          };
                        case 2: // 顾修 -> Deep Space Blue
                          return {
                            suckGradStart: "#0A1128",
                            suckGradMid1: "#102A43",
                            suckGradMid2: "#1C4E80",
                            suckGradEnd: "#60A5FA",
                            vibeGradStart: "#0B0F19",
                            vibeGradMid1: "#1E293B",
                            vibeGradMid2: "#3B82F6",
                            vibeGradEnd: "#93C5FD",
                            glowColor: "#60A5FA"
                          };
                        case 3: // 沉白 -> Water Teal
                          return {
                            suckGradStart: "#042F2E",
                            suckGradMid1: "#0D9488",
                            suckGradMid2: "#14B8A6",
                            suckGradEnd: "#22D3EE",
                            vibeGradStart: "#064E3B",
                            vibeGradMid1: "#059669",
                            vibeGradMid2: "#10B981",
                            vibeGradEnd: "#34D399",
                            glowColor: "#22D3EE"
                          };
                        case 4: // 司年 -> Sunset Orange
                          return {
                            suckGradStart: "#3F1E0B",
                            suckGradMid1: "#B45309",
                            suckGradMid2: "#D97706",
                            suckGradEnd: "#FBBF24",
                            vibeGradStart: "#451A03",
                            vibeGradMid1: "#9A3412",
                            vibeGradMid2: "#EA580C",
                            vibeGradEnd: "#F59E0B",
                            glowColor: "#F59E0B"
                          };
                        default:
                          return {
                            suckGradStart: "#0B0713",
                            suckGradMid1: "#4C1D95",
                            suckGradMid2: "#8B5CF6",
                            suckGradEnd: "#E5A995",
                            vibeGradStart: "#0B0713",
                            vibeGradMid1: "#3B0D80",
                            vibeGradMid2: "#4F46E5",
                            vibeGradEnd: "#7C3AED",
                            glowColor: null
                          };
                      }
                    })();

                    const suckGlowShadow = isPressureMode && !isManualOverride
                      ? 'inset 0 0 20px rgba(168, 85, 247, 0.2)'
                      : `0 4px 24px ${colors.glowColor ? `${colors.glowColor}40` : `rgba(229, 169, 149, ${0.05 + (currentSuck / 100) * 0.25})`}`;
                    
                    const vibeGlowShadow = isPressureMode && !isManualOverride
                      ? 'inset 0 0 20px rgba(168, 85, 247, 0.2)'
                      : `0 4px 24px ${colors.glowColor ? `${colors.glowColor}40` : `rgba(124, 58, 237, ${0.05 + (currentVibe / 100) * 0.25})`}`;

                    return (
                      <>
                        {/* 左轨: Suck 吸吮 */}
                        <div 
                          {...setupDragHandler('suck')}
                          style={{ boxShadow: suckGlowShadow }}
                          className={`w-[48%] rounded-2xl bg-[#130E26]/40 border relative overflow-hidden cursor-ns-resize flex flex-col justify-between p-4 transition-all duration-300 ${
                            suckAftershock ? 'animate-aftershock' : ''
                          } ${
                            isPressureMode && !isManualOverride 
                              ? 'border-purple-500/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.1)]' 
                              : 'border-white/5 hover:border-white/10'
                          }`}
                        >
                          {/* SVG Fluid Wave Layer */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen' }}>
                            <defs>
                              <linearGradient id="suck-wave-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.suckGradStart }} />
                                <stop offset="30%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.suckGradMid1 }} />
                                <stop offset="70%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.suckGradMid2 }} />
                                <stop offset="100%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.suckGradEnd }} />
                              </linearGradient>
                              <linearGradient id="suck-wave-grad-back" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.suckGradStart }} stopOpacity="0.5" />
                                <stop offset="50%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.suckGradMid1 }} stopOpacity="0.4" />
                                <stop offset="100%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.suckGradMid2 }} stopOpacity="0.6" />
                              </linearGradient>
                              <filter id="suck-wave-filter" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency={suckWobbleFreq} numOctaves="3" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale={suckWobbleScale} xChannelSelector="R" yChannelSelector="G" />
                              </filter>
                            </defs>

                            {/* Background Layer (Back Wave) */}
                            <rect 
                              x="-20%" 
                              y={`${100 - Math.max(0, currentSuck - 6)}%`} 
                              width="140%" 
                              height={`${Math.max(0, currentSuck - 6) + 30}%`} 
                              fill="url(#suck-wave-grad-back)" 
                              filter="url(#suck-wave-filter)"
                              className="transition-all duration-300"
                            />
                            {/* Foreground Layer (Front Wave) */}
                            <rect 
                              x="-20%" 
                              y={`${100 - currentSuck}%`} 
                              width="140%" 
                              height={`${currentSuck + 30}%`} 
                              fill="url(#suck-wave-grad)" 
                              filter="url(#suck-wave-filter)"
                              className="transition-all duration-300"
                            />
                          </svg>

                          {/* Interactive Ripple Glows */}
                          {suckTouch.active && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                              <div 
                                style={{ left: `${suckTouch.x}px`, top: `${suckTouch.y}px` }}
                                className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${suckTouch.x}px`, top: `${suckTouch.y}px`, boxShadow: `0 0 12px ${colors.glowColor || '#E5A995'}` }}
                              />
                              <div 
                                style={{ left: `${suckTouch.x}px`, top: `${suckTouch.y}px` }}
                                className="absolute w-12 h-12 border rounded-full -translate-x-1/2 -translate-y-1/2 animate-touch-ripple"
                                style={{ left: `${suckTouch.x}px`, top: `${suckTouch.y}px`, borderColor: `${colors.glowColor || '#E5A995'}80` }}
                              />
                              <div 
                                style={{ left: `${suckTouch.x}px`, top: `${suckTouch.y}px`, animationDelay: '0.2s' }}
                                className="absolute w-20 h-20 border rounded-full -translate-x-1/2 -translate-y-1/2 animate-touch-ripple"
                                style={{ left: `${suckTouch.x}px`, top: `${suckTouch.y}px`, borderColor: `${colors.glowColor || '#E5A995'}40`, animationDelay: '0.2s' }}
                              />
                            </div>
                          )}

                          {/* Aurora Overlay */}
                          {isPressureMode && (
                            <div 
                              className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 overflow-hidden ${
                                isManualOverride ? 'opacity-30' : 'opacity-80'
                              }`}
                            >
                              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-purple-500/10 to-transparent animate-[spin_20s_linear_infinite] mix-blend-screen blur-2xl pointer-events-none"></div>
                            </div>
                          )}

                          {/* Warm Malt Glow overlay at the bottom */}
                          <div 
                            className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#E5A995]/40 via-[#E5A995]/10 to-transparent blur-md pointer-events-none z-10 transition-opacity duration-500 ${
                              isTempOn ? 'opacity-100' : 'opacity-0'
                            }`}
                          />

                          {/* Top Labels */}
                          <div className="w-full flex justify-between items-center z-10 pointer-events-none">
                            <span className="text-[10px] text-white/40 tracking-widest font-serif">SUCK</span>
                            <span 
                              className="text-[10px] font-light bg-white/5 border rounded-md px-1.5 py-0.5 scale-90 transition-all duration-300"
                              style={{ color: colors.glowColor || '#E5A995', borderColor: `${colors.glowColor || '#E5A995'}40` }}
                            >
                              {currentSuck}%
                            </span>
                          </div>

                          {/* Bottom Center State Text */}
                          <div className="w-full text-center z-10 pointer-events-none flex flex-col items-center">
                            <span className="text-xs font-serif text-white tracking-widest font-medium">吸吮能量瀑</span>
                            <span className="text-[9px] text-white/30 font-light mt-0.5">
                              {isPressureMode && !isManualOverride ? '智能压力托管中' : '单手滑动调节'}
                            </span>
                          </div>

                        </div>

                        {/* 右轨: Vibrate 震动 */}
                        <div 
                          {...setupDragHandler('vibrate')}
                          style={{ boxShadow: vibeGlowShadow }}
                          className={`w-[48%] rounded-2xl bg-[#130E26]/40 border relative overflow-hidden cursor-ns-resize flex flex-col justify-between p-4 transition-all duration-300 ${
                            vibeAftershock ? 'animate-aftershock' : ''
                          } ${
                            isPressureMode && !isManualOverride 
                              ? 'border-purple-500/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.1)]' 
                              : 'border-white/5 hover:border-white/10'
                          }`}
                        >
                          {/* SVG Fluid Wave Layer */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen' }}>
                            <defs>
                              <linearGradient id="vibe-wave-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.vibeGradStart }} />
                                <stop offset="30%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.vibeGradMid1 }} />
                                <stop offset="70%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.vibeGradMid2 }} />
                                <stop offset="100%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.vibeGradEnd }} />
                              </linearGradient>
                              <linearGradient id="vibe-wave-grad-back" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.vibeGradStart }} stopOpacity="0.5" />
                                <stop offset="50%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.vibeGradMid1 }} stopOpacity="0.4" />
                                <stop offset="100%" style={{ transition: 'stop-color 1.5s ease', stopColor: colors.vibeGradMid2 }} stopOpacity="0.6" />
                              </linearGradient>
                              <filter id="vibe-wave-filter" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency={vibeWobbleFreq} numOctaves="3" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale={vibeWobbleScale} xChannelSelector="R" yChannelSelector="G" />
                              </filter>
                            </defs>

                            {/* Background Layer (Back Wave) */}
                            <rect 
                              x="-20%" 
                              y={`${100 - Math.max(0, currentVibe - 6)}%`} 
                              width="140%" 
                              height={`${Math.max(0, currentVibe - 6) + 30}%`} 
                              fill="url(#vibe-wave-grad-back)" 
                              filter="url(#vibe-wave-filter)"
                              className="transition-all duration-300"
                            />
                            {/* Foreground Layer (Front Wave) */}
                            <rect 
                              x="-20%" 
                              y={`${100 - currentVibe}%`} 
                              width="140%" 
                              height={`${currentVibe + 30}%`} 
                              fill="url(#vibe-wave-grad)" 
                              filter="url(#vibe-wave-filter)"
                              className="transition-all duration-300"
                            />
                          </svg>

                          {/* Interactive Ripple Glows */}
                          {vibrateTouch.active && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                              <div 
                                style={{ left: `${vibrateTouch.x}px`, top: `${vibrateTouch.y}px` }}
                                className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${vibrateTouch.x}px`, top: `${vibrateTouch.y}px`, boxShadow: `0 0 12px ${colors.glowColor || '#7C3AED'}` }}
                              />
                              <div 
                                style={{ left: `${vibrateTouch.x}px`, top: `${vibrateTouch.y}px` }}
                                className="absolute w-12 h-12 border rounded-full -translate-x-1/2 -translate-y-1/2 animate-touch-ripple"
                                style={{ left: `${vibrateTouch.x}px`, top: `${vibrateTouch.y}px`, borderColor: `${colors.glowColor || '#7C3AED'}80` }}
                              />
                              <div 
                                style={{ left: `${vibrateTouch.x}px`, top: `${vibrateTouch.y}px`, animationDelay: '0.2s' }}
                                className="absolute w-20 h-20 border rounded-full -translate-x-1/2 -translate-y-1/2 animate-touch-ripple"
                                style={{ left: `${vibrateTouch.x}px`, top: `${vibrateTouch.y}px`, borderColor: `${colors.glowColor || '#7C3AED'}40`, animationDelay: '0.2s' }}
                              />
                            </div>
                          )}

                          {/* Aurora Overlay */}
                          {isPressureMode && (
                            <div 
                              className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 overflow-hidden ${
                                isManualOverride ? 'opacity-30' : 'opacity-80'
                              }`}
                            >
                              <div className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-500/10 via-[#7C3AED]/5 to-transparent animate-[spin_25s_linear_infinite_reverse] mix-blend-screen blur-2xl pointer-events-none"></div>
                            </div>
                          )}

                          {/* Warm Malt Glow overlay at the bottom */}
                          <div 
                            className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#E5A995]/40 via-[#E5A995]/10 to-transparent blur-md pointer-events-none z-10 transition-opacity duration-500 ${
                              isTempOn ? 'opacity-100' : 'opacity-0'
                            }`}
                          />

                          {/* Top Labels */}
                          <div className="w-full flex justify-between items-center z-10 pointer-events-none">
                            <span className="text-[10px] text-white/40 tracking-widest font-serif">VIBE</span>
                            <span 
                              className="text-[10px] font-light bg-white/5 border rounded-md px-1.5 py-0.5 scale-90 transition-all duration-300"
                              style={{ color: colors.glowColor || '#7C3AED', borderColor: `${colors.glowColor || '#7C3AED'}40` }}
                            >
                              {currentVibe}%
                            </span>
                          </div>

                          {/* Bottom Center State Text */}
                          <div className="w-full text-center z-10 pointer-events-none flex flex-col items-center">
                            <span className="text-xs font-serif text-white tracking-widest font-medium">震动能量瀑</span>
                            <span className="text-[9px] text-white/30 font-light mt-0.5">
                              {isPressureMode && !isManualOverride ? '智能压力托管中' : '单手滑动调节'}
                            </span>
                          </div>

                        </div>
                      </>
                    );
                  })()}

                </div>

                {/* 5. 底部控制板 (mx-5, flex flex-col gap-3) */}
                <div className="mx-5 flex flex-col gap-2.5 z-10 select-none">
                  
                  {/* 卡片 1: 触觉参数微调栏 */}
                  <div className="h-[60px] w-full rounded-2xl bg-[#23153A]/40 border border-white/5 flex justify-between items-center px-4 backdrop-blur-md flex-shrink-0">
                    <div className="flex-1 flex flex-col">
                      <span className="text-[9px] text-white/40 font-light mb-1">吸吮频率</span>
                      <select 
                        value={suckFrequency} 
                        onChange={(e) => setSuckFrequency(e.target.value)}
                        className="bg-[#1F1635]/80 text-white border border-white/10 rounded-lg px-2 py-0.5 text-[11px] outline-none cursor-pointer focus:border-[#E5A995]/50 transition-colors max-w-[90%]"
                      >
                        <option value="常规">常规模式</option>
                        <option value="脉冲">脉冲频率</option>
                        <option value="潮汐">潮汐涨落</option>
                      </select>
                    </div>

                    <div className="w-px h-8 bg-white/5 flex-shrink-0" />

                    <div className="flex-1 flex flex-col items-end pl-4">
                      <span className="text-[9px] text-white/40 font-light mb-1 self-start">震动波形</span>
                      <button 
                        onClick={() => {
                          const nextWave = vibeWaveform === '轻柔' ? '激荡' : vibeWaveform === '激荡' ? '深度' : '轻柔';
                          setVibeWaveform(nextWave);
                          showToast(`已切换震动波形为: ${nextWave}`);
                        }}
                        className="w-full bg-[#1F1635]/80 text-white border border-white/10 rounded-lg py-1 text-[11px] outline-none hover:border-[#7C3AED]/50 transition-colors text-center active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        波形: <span className="text-purple-300 font-normal">{vibeWaveform}</span>
                      </button>
                    </div>
                  </div>

                  {/* 卡片 2: 智能压力感应 Toggle */}
                  <div 
                    className={`h-[54px] w-full rounded-2xl bg-[#23153A]/40 border flex justify-between items-center px-4 backdrop-blur-md flex-shrink-0 transition-all duration-300 ${
                      isPressureMode && isManualOverride 
                        ? 'opacity-50 animate-pulse border-purple-500/30' 
                        : 'opacity-100 border-white/5'
                    }`}
                  >
                    <div className="flex flex-col border-0">
                      <span className="text-xs font-normal text-white">「智能压力感应模式」</span>
                      <span className="text-[9px] text-white/40 font-light mt-0.5">
                        {isPressureMode 
                          ? (isManualOverride ? '手指触碰中：手动暂代' : '物理触控压力自动接管中')
                          : '根据物理触压自动调节变频'}
                      </span>
                    </div>
                    
                    {/* Toggle 切换开关 */}
                    <button 
                      onClick={() => {
                        setIsPressureMode(!isPressureMode);
                        if (!isPressureMode) {
                          setIsManualOverride(false);
                        }
                        showToast(!isPressureMode ? "智能压力感应模式已开启" : "智能压力感应模式已关闭");
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center border border-white/10 ${
                        isPressureMode ? 'bg-[#A855F7]' : 'bg-white/10'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-all absolute ${isPressureMode ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>

                  {/* 卡片 3: 体贴温控 */}
                  <div className="h-[54px] w-full rounded-2xl bg-[#23153A]/40 border border-white/5 flex justify-between items-center px-4 backdrop-blur-md mb-1 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg transition-all duration-300 ${isTempOn ? 'bg-[#E5A995]/20 text-[#E5A995]' : 'bg-white/5 text-white/40'}`}>
                        <Thermometer className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-normal text-white">「体贴温度」</span>
                        <span className="text-[9px] text-white/40 font-light mt-0.5">恒温预热 (38-42°C)</span>
                      </div>
                    </div>
                    
                    {/* Toggle 开关 */}
                    <button 
                      onClick={() => {
                        setIsTempOn(!isTempOn);
                        showToast(!isTempOn ? "体贴温控已开启，系统预热中" : "体贴温控已关闭");
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center border border-white/10 ${
                        isTempOn ? 'bg-[#E5A995]' : 'bg-white/10'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-all absolute ${isTempOn ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================
                TAB 4: 个人中心 (ProfileView)
                ======================================================== */}
            {currentTab === 'mine' && !activeChatCharacter && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 bg-[#0B0713] select-none animate-fade-in h-[calc(100vh-68px)] relative">
                
                {/* 1. 顶部用户信息与头像修改入口 */}
                <div 
                  onClick={() => setIsProfileEditOpen(true)}
                  className="flex items-center gap-4 pt-2 pb-4 border-b border-white/5 cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all select-none"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[#E5A995]/20 flex-shrink-0 relative shadow-[0_0_12px_rgba(229,169,149,0.2)] bg-[#1F1635]">
                    <img 
                      src={profileAvatar} 
                      alt={profileName} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"; }}
                    />
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-serif text-[#F8F9FA] font-medium tracking-wide">{profileName}</h3>
                        <span className="text-[10px] text-white/30">✏️</span>
                      </div>
                      <span className="text-[9px] text-[#E5A995] font-light mt-0.5 border border-[#E5A995]/20 rounded-md px-1.5 py-0.5 scale-95 origin-left tracking-wider bg-[#E5A995]/5 bg-opacity-10 w-fit">
                        黄金星轨筑梦师 · 生日 {profileBirthday}
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid triggering BottomSheet
                        setIsAccountModalOpen(true);
                      }}
                      className="p-1.5 rounded-full bg-white/5 border border-white/10 text-soulom-muted hover:text-soulom-text active:scale-90 transition-all cursor-pointer flex items-center justify-center"
                    >
                      <Settings className="w-3.5 h-3.5 text-white/50 hover:text-white" />
                    </button>
                  </div>
                </div>

                {/* 2. 羁绊数据平铺 Data Grid */}
                <div className="grid grid-cols-3 gap-2 py-1.5 bg-[#1F1635]/40 border border-white/[0.06] rounded-2xl p-2.5 text-center">
                  <div>
                    <div className="font-serif text-[16px] text-[#E5A995] font-bold">32个</div>
                    <div className="text-[9px] text-soulom-muted font-light mt-0.5">梦境留痕</div>
                  </div>
                  <div className="border-x border-white/[0.06]">
                    <div className="font-serif text-[16px] text-[#E5A995] font-bold">1450分</div>
                    <div className="text-[9px] text-soulom-muted font-light mt-0.5">共鸣时刻</div>
                  </div>
                  <div>
                    <div className="font-serif text-[16px] text-[#E5A995] font-bold">4位</div>
                    <div className="text-[9px] text-soulom-muted font-light mt-0.5">心动角色</div>
                  </div>
                </div>

                {/* 3. 心动成就纪念册横滑手账 */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] text-white/30 tracking-widest font-serif">AURA MILESTONES · 心动成就纪念册</span>
                  <div className="flex overflow-x-auto gap-2 py-1.5 scrollbar-none snap-x snap-mandatory">
                    {[
                      { icon: "🔓", text: "顾修 · 星际初见" },
                      { icon: "💎", text: "破千分共鸣" },
                      { icon: "✨", text: "完美三周目通关" },
                      { icon: "🌹", text: "掌心余温 · 回响" },
                      { icon: "🌌", text: "捕梦达人" }
                    ].map((milestone, idx) => (
                      <div 
                        key={idx} 
                        className="flex-shrink-0 snap-start flex items-center gap-1.5 bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-full text-[10px] text-[#E5A995]/85 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:border-[#E5A995]/20 transition-all"
                      >
                        <span className="text-xs">{milestone.icon}</span>
                        <span className="font-light tracking-wide">{milestone.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. 轻量化设置卡片组 */}
                <div className="flex flex-col gap-2.5">
                  
                  {/* 精简卡片 1: 隐私安全锁 */}
                  <div 
                    onClick={() => setIsPrivacyLockPageOpen(true)}
                    className="w-full h-12 px-4 rounded-xl bg-[#1F1635]/40 border border-white/[0.06] flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg transition-colors ${isPrivacyLockOn ? 'bg-[#E5A995]/20 text-[#E5A995]' : 'bg-white/5 text-soulom-muted'}`}>
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs text-soulom-text font-medium">隐私安全锁</span>
                        <span className="text-[8px] text-soulom-muted font-light mt-0.5">安全解锁与防窥设置</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-soulom-muted opacity-60" />
                  </div>

                  {/* 恢复卡片 2: 通知提醒设置 */}
                  <div 
                    onClick={() => setIsNotificationSettingsOpen(true)}
                    className="w-full h-12 px-4 rounded-xl bg-[#1F1635]/40 border border-white/[0.06] flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white/5 text-soulom-muted">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-soulom-text font-medium">通知提醒设置</span>
                        <span className="text-[11px] text-slate-400 font-light mt-0.5">管理梦境推送与私密伪装通知</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-soulom-muted opacity-60" />
                  </div>

                  {/* 精简卡片 3: 物理清除梦境记忆 */}
                  <div 
                    onClick={() => {
                      setErasureStep(1);
                      setIsErasureModalOpen(true);
                    }}
                    className="w-full h-12 px-4 rounded-xl bg-[#1F1635]/40 border border-white/[0.06] flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-red-950/20 text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-soulom-text font-medium">物理清除梦境记忆</span>
                        <span className="text-[8px] text-red-400/60 font-light mt-0.5">一键永久物理抹除所有多轮聊天档</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-soulom-muted" />
                  </div>

                </div>

                {/* 5. 退出与合规底栏 */}
                <div className="flex flex-col gap-3.5">
                  {/* 退出当前账户 */}
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setCurrentTab('plaza');
                    }}
                    className="w-full h-10 flex items-center justify-center gap-2 bg-[#ef4444]/10 hover:bg-[#ef4444]/15 active:scale-98 transition-all rounded-xl text-xs text-[#ef4444] font-light tracking-widest cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> 退出当前登录账户
                  </button>

                  {/* 合规超细链接 */}
                  <div className="flex items-center justify-center gap-3 pb-[safe-area] text-[10px] font-thin text-white/30 select-none">
                    <button 
                      type="button" 
                      onClick={() => setComplianceDoc('userAgreement')}
                      className="hover:text-white/60 transition-colors bg-transparent border-0 cursor-pointer text-[10px] font-thin"
                    >
                      《用户协议》
                    </button>
                    <span className="text-white/10 text-[9px]">|</span>
                    <button 
                      type="button" 
                      onClick={() => setComplianceDoc('privacyPolicy')}
                      className="hover:text-white/60 transition-colors bg-transparent border-0 cursor-pointer text-[10px] font-thin"
                    >
                      《隐私权政策》
                    </button>
                    <span className="text-white/10 text-[9px]">|</span>
                    <button 
                      type="button" 
                      onClick={() => setComplianceDoc('complianceGuide')}
                      className="hover:text-white/60 transition-colors bg-transparent border-0 cursor-pointer text-[10px] font-thin"
                    >
                      《平台合规指引》
                    </button>
                  </div>
                </div>

                {/* 🔔 通知提醒设置二级子页面 */}
                {isNotificationSettingsOpen && (
                  <div className="absolute inset-0 bg-[#0B0713]/95 backdrop-blur-xl z-[85] animate-slide-left flex flex-col p-4 select-none h-full overflow-hidden">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <button 
                        type="button"
                        onClick={() => setIsNotificationSettingsOpen(false)}
                        className="p-1.5 rounded-full bg-white/5 border border-white/10 text-soulom-muted hover:text-soulom-text active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                      >
                        <ArrowLeft className="w-4 h-4 text-white/70" />
                      </button>
                      <h3 className="text-sm font-serif text-[#F8F9FA] font-medium tracking-wide">通知提醒设置</h3>
                      <div className="w-7 h-7"></div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col gap-4 mt-4 overflow-y-auto scrollbar-none pb-4">
                      
                      {/* 核心组件 1: 梦境台词推送 */}
                      <div className="w-full p-4 rounded-xl bg-[#1F1635]/40 border border-white/[0.06] flex justify-between items-center hover:bg-white/5 transition-colors">
                        <div className="flex flex-col gap-0.5 max-w-[80%] text-left">
                          <span className="text-xs text-soulom-text font-medium">允许角色发送梦境提醒</span>
                          <span className="text-[10px] text-soulom-muted font-light leading-relaxed">
                            允许 AI 角色在梦境深处向您发送呼吸与心跳的感应推送与日常提醒。
                          </span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setIsDreamPushOn(!isDreamPushOn)}
                          className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center cursor-pointer flex-shrink-0 ${isDreamPushOn ? 'bg-[#E5A995]' : 'bg-white/10'}`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full transition-all absolute ${isDreamPushOn ? 'left-5.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'left-1 bg-white/40'}`}></div>
                        </button>
                      </div>

                      {/* 核心组件 2: 私密伪装通知模式 */}
                      <div className="w-full p-4 rounded-xl bg-[#1F1635]/40 border border-white/[0.06] flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col gap-0.5 max-w-[80%] text-left">
                            <span className="text-xs text-soulom-text font-medium">开启私密伪装通知</span>
                            <span className="text-[10px] text-slate-400 font-light leading-relaxed">
                              开启后，手机锁屏通知将自动伪装为系统或天气工具消息，彻底隐藏真实聊天文本。
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              const nextVal = !isPrivateDisguiseOn;
                              setIsPrivateDisguiseOn(nextVal);
                              showToast(nextVal ? "已启用锁屏通知私密伪装" : "已恢复标准锁屏通知");
                            }}
                            className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center cursor-pointer flex-shrink-0 ${isPrivateDisguiseOn ? 'bg-[#E5A995]' : 'bg-white/10'}`}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full transition-all absolute ${isPrivateDisguiseOn ? 'left-5.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'left-1 bg-white/40'}`}></div>
                          </button>
                        </div>

                        {/* 动态对比效果滑出 */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPrivateDisguiseOn ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                          <div className="border-t border-white/5 pt-3 flex flex-col gap-3">
                            <span className="text-[9px] text-[#E5A995]/80 tracking-widest font-serif text-left">AURA DISGUISE · 锁屏通知预览对比</span>
                            
                            <div className="flex flex-col gap-3">
                              {/* 1. 标准模式 */}
                              <div className="flex flex-col gap-1 text-left">
                                <span className="text-[9px] text-white/30 pl-1">未开启伪装 (真实内容公开)</span>
                                <div className="w-full p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex gap-2.5 items-center">
                                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#1F1635] flex items-center justify-center text-xs text-[#E5A995] font-serif border border-[#E5A995]/20 flex-shrink-0">
                                    S
                                  </div>
                                  <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] text-white/80 font-medium font-serif font-sans">林深</span>
                                      <span className="text-[8px] text-white/20">现在</span>
                                    </div>
                                    <span className="text-[9px] text-white/50 truncate">“笨蛋，贴在我的胸口，能听到我的心跳吗？...”</span>
                                  </div>
                                </div>
                              </div>

                              {/* 2. 伪装模式 */}
                              <div className="flex flex-col gap-1 text-left">
                                <div className="flex justify-between items-center pr-1">
                                  <span className="text-[9px] text-[#E5A995]/60 pl-1 font-medium">★ 开启伪装 (安全防窥保护)</span>
                                  <span className="text-[8px] text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-1.5 py-0.2 rounded-full font-sans">已就绪</span>
                                </div>
                                <div className="w-full p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/10 to-[#1F1635]/30 border border-emerald-500/20 flex gap-2.5 items-center shadow-[0_4px_12px_rgba(16,185,129,0.05)]">
                                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-sky-950/20 flex items-center justify-center text-xs text-sky-400 border border-sky-500/20 flex-shrink-0">
                                    ☁️
                                  </div>
                                  <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] text-sky-400 font-medium font-sans">系统天气</span>
                                      <span className="text-[8px] text-white/20 font-sans">现在</span>
                                    </div>
                                    <span className="text-[9px] text-slate-300 truncate font-light">“今日气温下降2℃，湿度75%，请注意添衣防寒。”</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Footer Safety Notice */}
                    <div className="pt-2.5 border-t border-white/5 text-center mt-auto flex-shrink-0">
                      <span className="text-[9px] text-white/20 font-light">🔒 零本地日志残留，全通道匿名加密防窥</span>
                    </div>

                  </div>
                )}

                {/* 🔒 隐私安全锁二级设置页面 */}
                {isPrivacyLockPageOpen && (
                  <div className="absolute inset-0 bg-[#0D0819] z-[85] animate-slide-left flex flex-col select-none h-full overflow-hidden">
                    
                    {/* Header */}
                    <div className="h-14 px-4 flex items-center justify-between border-b border-white/5 flex-shrink-0">
                      <button 
                        type="button"
                        onClick={() => setIsPrivacyLockPageOpen(false)}
                        className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                      >
                        <ArrowLeft className="w-4 h-4 text-white/70" />
                      </button>
                      <h3 className="text-[16px] font-bold text-slate-200 font-serif">隐私安全锁</h3>
                      <div className="w-8 h-8"></div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto scrollbar-none pb-6">
                      
                      {/* 核心主开关卡片 */}
                      <div className="bg-white/5 rounded-2xl p-4 flex justify-between items-center border border-white/5 mx-4 mt-4">
                        <div className="flex flex-col gap-0.5 text-left max-w-[75%]">
                          <span className="text-sm font-medium text-slate-200">启用应用锁</span>
                          <span className="text-[11px] text-slate-400 font-light leading-relaxed">
                            开启后，每次冷启动或从后台切回应用时均需安全验证
                          </span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            const nextVal = !isPrivacyLockOn;
                            setIsPrivacyLockOn(nextVal);
                            showToast(nextVal ? "已启用隐私锁，首次需验证" : "已停用隐私锁");
                          }}
                          className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center cursor-pointer flex-shrink-0 ${isPrivacyLockOn ? 'bg-[#E5A995]' : 'bg-white/10'}`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full transition-all absolute ${isPrivacyLockOn ? 'left-5.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'left-1 bg-white/40'}`}></div>
                        </button>
                      </div>

                      {/* 密码与生物识别配置组 */}
                      <div className={`transition-all duration-300 ${isPrivacyLockOn ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none'}`}>
                        
                        <div className="bg-white/5 rounded-2xl mx-4 mt-3 px-4 border border-white/5 divide-y divide-white/5">
                          
                          {/* 子项 1: 修改独立密码 */}
                          <div 
                            onClick={() => {
                              if (isPrivacyLockOn) {
                                setKeypadInput("");
                                setKeypadStep("enter_new");
                                setIsNumericKeypadOpen(true);
                              }
                            }}
                            className="h-14 flex justify-between items-center cursor-pointer hover:bg-white/[0.01] transition-colors"
                          >
                            <div className="flex flex-col text-left gap-0.5">
                              <span className="text-xs text-slate-200 font-medium">独立数码密码设置</span>
                              <span className="text-[10px] text-slate-400 font-light">设置专属于 Soulom 的 4 位隐私密码</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>

                          {/* 子项 2: 生物识别解锁 */}
                          <div className="h-14 flex justify-between items-center">
                            <div className="flex flex-col text-left gap-0.5">
                              <span className="text-xs text-slate-200 font-medium">面容 / 指纹快速解锁</span>
                              <span className="text-[10px] text-slate-400 font-light">启用设备自带的 Face ID 或 Touch ID 快捷验证</span>
                            </div>
                            <button 
                              type="button"
                              onClick={() => {
                                if (isPrivacyLockOn) {
                                  const nextVal = !isBiometricEnabled;
                                  setIsBiometricEnabled(nextVal);
                                  showToast(nextVal ? "生物识别验证已绑定" : "生物识别解锁已关闭");
                                }
                              }}
                              className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center cursor-pointer flex-shrink-0 ${isBiometricEnabled ? 'bg-[#E5A995]' : 'bg-white/10'}`}
                            >
                              <div className={`w-3.5 h-3.5 rounded-full transition-all absolute ${isBiometricEnabled ? 'left-5.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'left-1 bg-white/40'}`}></div>
                            </button>
                          </div>

                        </div>

                        {/* 锁定触发时机 */}
                        <div className="bg-white/5 rounded-2xl p-4 mx-4 mt-3 border border-white/5 flex flex-col gap-3">
                          <span className="text-sm font-medium text-slate-300 text-left">自动锁定触发时机</span>
                          <div className="bg-black/30 rounded-xl p-1 flex w-full text-xs">
                            {[
                              { label: '立即锁定', value: 'immediate' },
                              { label: '离开 1 分钟', value: '1min' },
                              { label: '离开 5 分钟', value: '5min' }
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setLockTriggerOption(opt.value)}
                                className={`flex-1 py-1.5 text-center transition-all cursor-pointer ${
                                  lockTriggerOption === opt.value 
                                    ? 'bg-white/10 text-[#E5A995] rounded-lg shadow-sm font-medium' 
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 高级防窥特权模块 */}
                        <div className="bg-[#23153A]/30 rounded-2xl p-4 mx-4 mt-3 border border-[#E5A995]/10 flex justify-between items-start">
                          <div className="flex flex-col text-left gap-0.5 max-w-[80%]">
                            <span className="text-xs text-slate-200 font-medium">✨ 开启多任务后台防窥预览</span>
                            <span className="text-[11px] text-slate-400 font-light leading-relaxed">
                              开启后，当手机进入系统多任务后台时，本应用的缩略图界面将自动高斯模糊（App Switcher Blur），严防任何侧目窥探。
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              const nextVal = !isAntiPeepEnabled;
                              setIsAntiPeepEnabled(nextVal);
                              showToast(nextVal ? "多任务后台高斯模糊已启用" : "多任务防窥已关闭");
                            }}
                            className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center cursor-pointer flex-shrink-0 ${isAntiPeepEnabled ? 'bg-[#E5A995]' : 'bg-white/10'}`}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full transition-all absolute ${isAntiPeepEnabled ? 'left-5.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'left-1 bg-white/40'}`}></div>
                          </button>
                        </div>

                      </div>

                    </div>

                    {/* Footer Lock Notice */}
                    <div className="p-4 border-t border-white/5 text-center flex-shrink-0 mt-auto">
                      <span className="text-[9px] text-white/20 font-light">🔒 采用原生硬件级沙盒密钥，防爆破与伪签名拦截</span>
                    </div>

                  </div>
                )}

                {/* 🔢 4位独立数码密码键盘设置页 */}
                {isNumericKeypadOpen && (
                  <div className="absolute inset-0 bg-[#0B0713]/98 z-[90] flex flex-col justify-between p-6 animate-scale-up select-none">
                    
                    {/* Keypad Header */}
                    <div className="flex justify-between items-center">
                      <button 
                        type="button" 
                        onClick={() => {
                          setIsNumericKeypadOpen(false);
                          setKeypadInput("");
                        }}
                        className="text-xs text-slate-400 hover:text-slate-200 bg-transparent border-0 cursor-pointer"
                      >
                        取消
                      </button>
                      <span className="text-xs text-slate-400 font-light">安全密码保护</span>
                      <div className="w-8"></div>
                    </div>

                    {/* Passcode State Titles & Dot Display */}
                    <div className="flex flex-col items-center mt-10">
                      <h4 className="text-base font-serif text-slate-200 font-medium tracking-wide">
                        {keypadStep === 'enter_new' ? '设置 4 位数隐私密码' : '确认新隐私密码'}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light mt-1.5">
                        {keypadStep === 'enter_new' ? '设置专属于 Soulom 的 4 位隐私密码' : '请再次输入刚才设置的 4 位密码'}
                      </p>

                      {/* Dots */}
                      <div className="flex justify-center gap-4 my-8">
                        {[0, 1, 2, 3].map((i) => (
                          <div 
                            key={i} 
                            className={`w-3.5 h-3.5 rounded-full border border-[#E5A995]/30 transition-all duration-200 ${
                              keypadInput.length > i 
                                ? 'bg-[#E5A995] scale-110 shadow-[0_0_8px_rgba(229,169,149,0.5)]' 
                                : 'bg-white/5'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Numeric Keyboard Grid */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="grid grid-cols-3 gap-y-4 gap-x-8 max-w-[280px] mx-auto">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => {
                              if (keypadInput.length < 4) {
                                const nextVal = keypadInput + num;
                                setKeypadInput(nextVal);
                                
                                if (nextVal.length === 4) {
                                  setTimeout(() => {
                                    if (keypadStep === 'enter_new') {
                                      setKeypadTemp(nextVal);
                                      setKeypadStep('confirm_new');
                                      setKeypadInput("");
                                      showToast("请再次输入以确认新密码");
                                    } else {
                                      if (nextVal === keypadTemp) {
                                        setNumericPasscode(nextVal);
                                        setIsPrivacyLockOn(true);
                                        setIsNumericKeypadOpen(false);
                                        setKeypadInput("");
                                        showToast("🔐 独立隐私数码密码已成功启用");
                                      } else {
                                        setKeypadStep('enter_new');
                                        setKeypadInput("");
                                        setKeypadTemp("");
                                        showToast("密码不一致，请重新输入");
                                      }
                                    }
                                  }, 300);
                                }
                              }
                            }}
                            className="w-14 h-14 rounded-full bg-white/5 border border-white/[0.06] flex items-center justify-center text-xl text-slate-200 font-mono hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                          >
                            {num}
                          </button>
                        ))}

                        {/* Spacer */}
                        <div className="w-14 h-14 flex items-center justify-center"></div>

                        {/* Zero */}
                        <button
                          type="button"
                          onClick={() => {
                            if (keypadInput.length < 4) {
                              const nextVal = keypadInput + "0";
                              setKeypadInput(nextVal);
                              if (nextVal.length === 4) {
                                setTimeout(() => {
                                  if (keypadStep === 'enter_new') {
                                    setKeypadTemp(nextVal);
                                    setKeypadStep('confirm_new');
                                    setKeypadInput("");
                                    showToast("请再次输入以确认新密码");
                                  } else {
                                    if (nextVal === keypadTemp) {
                                      setNumericPasscode(nextVal);
                                      setIsPrivacyLockOn(true);
                                      setIsNumericKeypadOpen(false);
                                      setKeypadInput("");
                                      showToast("🔐 独立隐私数码密码已成功启用");
                                    } else {
                                      setKeypadStep('enter_new');
                                      setKeypadInput("");
                                      setKeypadTemp("");
                                      showToast("密码不一致，请重新输入");
                                    }
                                  }
                                }, 300);
                              }
                            }
                          }}
                          className="w-14 h-14 rounded-full bg-white/5 border border-white/[0.06] flex items-center justify-center text-xl text-slate-200 font-mono hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                        >
                          0
                        </button>

                        {/* Backspace */}
                        <button
                          type="button"
                          onClick={() => {
                            if (keypadInput.length > 0) {
                              setKeypadInput(keypadInput.slice(0, -1));
                            }
                          }}
                          className="w-14 h-14 rounded-full bg-white/5 border border-white/[0.06] flex items-center justify-center text-lg text-slate-400 hover:text-slate-200 hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                        >
                          ⌫
                        </button>
                      </div>
                    </div>

                    {/* Bottom status hint */}
                    <div className="text-center pb-2">
                      <span className="text-[9px] text-white/10">SOULOM SECURE CHIP KEYPAD</span>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* ========================================================
                底部固定导航栏 Fixed TabBar
                ======================================================== */}
            {!activeChatCharacter && (
              <nav className="w-full h-[68px] px-2 flex justify-around items-center border-t border-soulom-tabBorder bg-soulom-tabBg backdrop-blur-md z-45">
                
                {/* Tab 1: 广场 */}
                <button 
                  onClick={() => handleTabChange('plaza')}
                  className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-colors ${
                    currentTab === 'plaza' ? 'text-[#E5A995]' : 'text-soulom-muted hover:text-soulom-text'
                  }`}
                >
                  <Heart className="w-5 h-5 transition-transform active:scale-110" />
                  <span className="text-[10px] mt-1 scale-90 font-light tracking-wider">广场</span>
                </button>

                {/* Tab 2: 梦境 */}
                <button 
                  onClick={() => handleTabChange('dreams')}
                  className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-colors ${
                    currentTab === 'dreams' ? 'text-[#E5A995]' : 'text-soulom-muted hover:text-soulom-text'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 transition-transform active:scale-110" />
                  <span className="text-[10px] mt-1 scale-90 font-light tracking-wider">梦境</span>
                </button>

                {/* Tab 3: 触觉 */}
                <button 
                  onClick={() => handleTabChange('tactile')}
                  className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-colors ${
                    currentTab === 'tactile' ? 'text-[#E5A995]' : 'text-soulom-muted hover:text-soulom-text'
                  }`}
                >
                  <Activity className="w-5 h-5 transition-transform active:scale-110 animate-pulse-slow" />
                  <span className="text-[10px] mt-1 scale-90 font-light tracking-wider">触觉</span>
                </button>

                {/* Tab 4: 我的 */}
                <button 
                  onClick={() => handleTabChange('mine')}
                  className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-colors ${
                    currentTab === 'mine' ? 'text-[#E5A995]' : 'text-soulom-muted hover:text-soulom-text'
                  }`}
                >
                  <User className="w-5 h-5 transition-transform active:scale-110" />
                  <span className="text-[10px] mt-1 scale-90 font-light tracking-wider">我的</span>
                </button>

              </nav>
            )}

          </div>
        )}

        {/* ========================================================
            弹窗: 多轮故事中转弹窗 (Story Timeline Drawer)
            ======================================================== */}
        {timelineDrawerStory && (
          <>
            {/* Backdrop overlay */}
            <div 
              onClick={() => setTimelineDrawerStory(null)} 
              className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 animate-fade-in"
            />
            
            {/* Drawer panel */}
            <div className="absolute bottom-0 left-0 right-0 w-full rounded-t-3xl p-6 bg-[#23153A]/90 backdrop-blur-xl border-t border-white/10 z-50 animate-slide-up flex flex-col max-h-[75vh]">
              {/* Drawer drag handle indicator */}
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5 flex-shrink-0" />
              
              {/* Header */}
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h3 className="font-serif text-base text-[#E5A995] font-medium tracking-wider flex items-center gap-2">
                  <span>{timelineDrawerStory.character}</span>
                  <span className="text-[10px] font-light text-white/40 border border-white/10 rounded-md px-1.5 py-0.5 scale-90 origin-left">故事时间线</span>
                </h3>
                <button 
                  onClick={() => setTimelineDrawerStory(null)}
                  className="text-white/40 hover:text-white/60 text-xs p-1"
                >
                  关闭
                </button>
              </div>

              {/* Button: 一键重开 */}
              <button 
                onClick={() => {
                  const charId = timelineDrawerStory.id;
                  const newTimelineId = `${charId}-${Date.now()}`;
                  // Get character's initial greeting
                  const firstMsg = chatMessages[String(charId)]?.[0] || chatMessages[charId]?.[0] || { text: "梦醒了吗？森林里的落叶很轻，我想听听你今晚的声音。" };
                  const newMessages = [
                    { id: Date.now(), sender: 'character', text: firstMsg.text }
                  ];
                  setChatMessages(prev => ({
                    ...prev,
                    [newTimelineId]: newMessages
                  }));
                  
                  handleOpenChat(timelineDrawerStory, newTimelineId, '新故事');
                  setTimelineDrawerStory(null);
                  showToast(`已开启与 ${timelineDrawerStory.character} 的新一轮故事`);
                }}
                className="text-sm font-medium w-full h-11 justify-center flex items-center bg-white/10 hover:bg-white/15 text-white/90 rounded-xl transition-all duration-300 border border-white/5 active:scale-[0.98] flex-shrink-0 gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#E5A995]" /> 开启新一轮故事
              </button>

              {/* Timeline List */}
              <div className="max-h-60 overflow-y-auto w-full mt-4 flex flex-col gap-2.5 pr-0.5 scrollbar-thin">
                {(() => {
                  const charId = timelineDrawerStory.id;
                  // Gather and sort timelines
                  const timelines = Object.keys(chatMessages)
                    .filter(key => key === String(charId) || key.startsWith(String(charId) + '-'))
                    .map(key => {
                      const msgs = chatMessages[key] || [];
                      const lastMsg = msgs[msgs.length - 1] || null;
                      const isDefault = key === String(charId);
                      const createdTime = isDefault ? 0 : Number(key.split('-')[1]);
                      let lastUpdated = createdTime;
                      if (lastMsg && lastMsg.id > 100000) {
                        lastUpdated = lastMsg.id;
                      } else {
                        lastUpdated = isDefault ? Date.now() - 3 * 24 * 3600 * 1000 : createdTime;
                      }
                      return {
                        timelineId: key,
                        createdTime,
                        lastUpdated,
                        lastMessage: lastMsg,
                      };
                    });

                  // Sort ascending to calculate creation badges
                  timelines.sort((a, b) => a.createdTime - b.createdTime);
                  const timelinesWithBadges = timelines.map((t, idx) => {
                    let badge = `第 ${idx + 1} 轮故事`;
                    if (idx === timelines.length - 1 && timelines.length > 1) {
                      badge = "新故事";
                    } else if (timelines.length === 1) {
                      badge = "第 1 轮故事";
                    }
                    return { ...t, badge };
                  });

                  // Sort descending for list display
                  const displayTimelines = [...timelinesWithBadges].sort((a, b) => b.lastUpdated - a.lastUpdated);

                  return displayTimelines.map((timeline) => {
                    const lastMsgText = timeline.lastMessage 
                      ? (timeline.lastMessage.sender === 'user' ? '我：' : `${timelineDrawerStory.character}：`) + timeline.lastMessage.text 
                      : '无对话记录';
                    return (
                      <div 
                        key={timeline.timelineId}
                        onClick={() => {
                          handleOpenChat(timelineDrawerStory, timeline.timelineId);
                          setTimelineDrawerStory(null);
                        }}
                        className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/[0.06] backdrop-blur-md flex flex-col gap-2 cursor-pointer transition-all active:scale-[0.98] select-none text-left"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide bg-[#E5A995]/15 border border-[#E5A995]/30 text-[#E5A995] shadow-[0_0_8px_rgba(229,169,149,0.15)]">
                            {timeline.badge}
                          </span>
                          <span className="text-[10px] text-white/40 font-light font-sans">
                            {formatTimeAgo(timeline.lastUpdated)}
                          </span>
                        </div>
                        <div className="text-xs text-white/70 line-clamp-1 font-light tracking-wide">
                          {lastMsgText}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </>
        )}

        {/* ========================================================
            弹窗: 梦境捕获 (Dream Modal - 支持自定义名称/年龄/性格属性)
            ======================================================== */}
        {/* ========================================================
            弹窗: 梦境捕获 (Dream Drawer - Bottom Drawer Layout)
            ======================================================== */}
        {/* ========================================================
            弹窗: 梦境捕获 (Dream Drawer - Bottom Drawer Layout)
            ======================================================== */}
        {isDreamModalOpen && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col justify-end transition-all duration-300 animate-fade-in">
            <div className="w-full max-w-md rounded-t-[32px] bg-[#140C22]/95 border-t border-white/10 backdrop-blur-2xl p-6 flex flex-col gap-4 animate-slide-up relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
              {/* Drag Handle Bar */}
              <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-1 flex-shrink-0" />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-[#E5A995] tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 梦境捕获网
                </span>
                <span className="text-[10px] text-soulom-muted font-light">唤醒专属于你的共鸣分身</span>
              </div>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!dreamCharName.trim()) {
                    showToast("请输入角色名称");
                    return;
                  }
                  if (!dreamInput.trim()) {
                    showToast("请描绘今晚的梦境画卷");
                    return;
                  }
                  setIsDreamModalOpen(false);
                  setIsCanvasPageOpen(true);
                }} 
                className="flex flex-col gap-4"
              >
                {/* 角色名称与年龄 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="text-[10px] text-soulom-muted block mb-1.5 pl-1 font-light">角色名称</label>
                    <input 
                      type="text" 
                      required
                      placeholder="名字，如：星川"
                      value={dreamCharName}
                      onChange={(e) => setDreamCharName(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-soulom-inputBg border border-soulom-border focus:border-[#E5A995]/40 text-xs focus:outline-none placeholder-gray-600 text-soulom-text transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-soulom-muted block mb-1.5 pl-1 font-light">角色年龄</label>
                    <input 
                      type="number" 
                      required
                      placeholder="如：22"
                      value={dreamCharAge}
                      onChange={(e) => setDreamCharAge(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-soulom-inputBg border border-soulom-border focus:border-[#E5A995]/40 text-xs focus:outline-none placeholder-gray-600 text-soulom-text transition-all"
                    />
                  </div>
                </div>

                {/* 梦境内容描绘 */}
                <div>
                  <label className="text-[10px] text-soulom-muted block mb-1.5 pl-1 font-light">今晚落入的梦境画卷</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="用一句话，写下你今晚想落入的梦境..."
                    value={dreamInput}
                    onChange={(e) => setDreamInput(e.target.value)}
                    className="w-full rounded-xl bg-soulom-inputBg border border-soulom-border focus:border-[#E5A995]/40 text-xs p-3.5 focus:outline-none placeholder-gray-600 resize-none leading-relaxed text-soulom-text transition-all"
                  />
                </div>

                {/* 共鸣模型选择 */}
                <div>
                  <label className="text-[10px] text-soulom-muted block mb-2 pl-1 font-light">共鸣模型选择</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDreamModel('normal')}
                      className={`h-11 rounded-xl flex items-center justify-center gap-2 border text-xs font-medium transition-all ${
                        dreamModel === 'normal'
                          ? 'bg-[#E5A995]/15 border-[#E5A995]/80 text-[#E5A995] shadow-[0_0_12px_rgba(229,169,149,0.2)]'
                          : 'bg-white/5 border-white/[0.05] text-white/50 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${dreamModel === 'normal' ? 'bg-[#E5A995]' : 'bg-transparent border border-white/30'}`} />
                      浅层梦境
                    </button>
                    <button
                      type="button"
                      onClick={() => setDreamModel('unrated')}
                      className={`h-11 rounded-xl flex items-center justify-center gap-2 border text-xs font-medium transition-all ${
                        dreamModel === 'unrated'
                          ? 'bg-rose-500/15 border-rose-500/80 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                          : 'bg-white/5 border-white/[0.05] text-white/50 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${dreamModel === 'unrated' ? 'bg-rose-400' : 'bg-transparent border border-white/30'}`} />
                      深层梦境
                    </button>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex gap-3 mt-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsDreamModalOpen(false);
                      setDreamCharName('');
                      setDreamCharAge('');
                      setDreamInput('');
                      setDreamModel('normal');
                    }}
                    className="flex-1 h-11 rounded-xl bg-white/5 border border-white/5 text-xs text-soulom-muted hover:text-soulom-text transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit" 
                    className="flex-2 h-11 rounded-xl bg-[#E5A995] text-[#0B0713] font-semibold text-xs hover:bg-[#ebd0c7] transition-all shadow-[0_2px_12px_rgba(229,169,149,0.25)] active:scale-[0.98]"
                  >
                    🌟 下一步：重塑梦境画布
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================
            页面: 梦境画布重塑 (Canvas Page - 所见即所得视觉重塑)
            ======================================================== */}
        {isCanvasPageOpen && (() => {
          const avatarOptions = aiGeneratedAssets 
            ? [{ url: aiGeneratedAssets.avatar, isAi: true, idx: 10 }, ...DEFAULT_AVATARS.map((url, idx) => ({ url, isAi: false, idx }))]
            : DEFAULT_AVATARS.map((url, idx) => ({ url, isAi: false, idx }));
          const bgOptions = aiGeneratedAssets 
            ? [{ url: aiGeneratedAssets.background, isAi: true, idx: 10 }, ...DEFAULT_BACKGROUNDS.map((url, idx) => ({ url, isAi: false, idx }))]
            : DEFAULT_BACKGROUNDS.map((url, idx) => ({ url, isAi: false, idx }));
          const cardOptions = aiGeneratedAssets 
            ? [{ url: aiGeneratedAssets.card, isAi: true, idx: 10 }, ...DEFAULT_CARDS.map((url, idx) => ({ url, isAi: false, idx }))]
            : DEFAULT_CARDS.map((url, idx) => ({ url, isAi: false, idx }));

          return (
            <div className="absolute inset-0 bg-[#0B0713] z-50 flex flex-col justify-between overflow-hidden max-w-md mx-auto h-screen border border-soulom-border">
              {/* Header Bar */}
              <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 flex-shrink-0 bg-[#1E1135]/20">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsCanvasPageOpen(false);
                    setIsDreamModalOpen(true);
                  }}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-white/70 active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h3 className="font-serif text-xs text-[#F8F9FA] font-medium tracking-widest">梦境画布重塑</h3>
                <div className="w-9 h-9" />
              </div>

              {/* Scrollable Main Content */}
              <div className="flex-1 overflow-y-auto pr-0.5 pb-6 space-y-6 scrollbar-none min-h-0 bg-[#0B0713]">
                
                {/* 3D所见即所得卡片视效实时预览区 */}
                <div className="px-4 pt-4 flex justify-center items-center flex-shrink-0">
                  <div 
                    className="w-[170px] aspect-[3/4] rounded-2xl overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col justify-end p-3"
                  >
                    {/* Background poster */}
                    <img 
                      src={
                        aiGeneratedAssets && selectedBgIdx === 10 
                          ? aiGeneratedAssets.background 
                          : DEFAULT_BACKGROUNDS[selectedBgIdx]
                      } 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                      alt="preview-bg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0713]/90 via-transparent to-black/30"></div>
                    
                    {/* Top floating avatar & info */}
                    <div className="absolute top-2 left-2 right-2 flex items-center gap-1.5 z-10">
                      <div className="w-7 h-7 rounded-full border border-[#E5A995]/50 overflow-hidden shadow-md">
                        <img 
                          src={
                            aiGeneratedAssets && selectedAvatarIdx === 10 
                              ? aiGeneratedAssets.avatar 
                              : DEFAULT_AVATARS[selectedAvatarIdx]
                          } 
                          className="w-full h-full object-cover"
                          alt="preview-avatar"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-white tracking-wide font-serif leading-none">
                          {dreamCharName || '梦境分身'}
                        </span>
                        <span className="text-[7px] text-[#E5A995] font-light mt-0.5 leading-none">
                          {dreamModel === 'normal' ? '正常' : '尺度'} · {dreamCharAge ? `${dreamCharAge}岁` : '22岁'}
                        </span>
                      </div>
                    </div>

                    {/* Floating Character Card overlay */}
                    <img 
                      src={
                        aiGeneratedAssets && selectedCardIdx === 10 
                          ? aiGeneratedAssets.card 
                          : DEFAULT_CARDS[selectedCardIdx]
                      }
                      className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-20 pointer-events-none transition-all duration-300"
                      alt="card-overlay"
                    />

                    {/* Bottom Content description preview */}
                    <div className="z-10 mt-auto flex flex-col gap-0.5">
                      <div className="text-[8px] text-[#E5A995] tracking-widest font-semibold flex items-center gap-0.5">
                        <Sparkles className="w-2 h-2 animate-pulse" /> 梦境已捕获
                      </div>
                      <p className="text-[7.5px] text-white/60 line-clamp-2 leading-tight font-light font-sans">
                        {dreamInput || '用一句话，写下你今晚想落入的梦境...'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 三大视觉卡片区横滑 */}
                {/* 1. 角色头像 */}
                <div className="flex flex-col gap-2 px-4 flex-shrink-0">
                  <span className="text-xs text-[#E5A995] font-serif tracking-wider font-semibold">角色头像</span>
                  <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
                    {avatarOptions.map((opt) => {
                      const isSelected = selectedAvatarIdx === opt.idx;
                      return (
                        <div 
                          key={opt.idx}
                          onClick={() => setSelectedAvatarIdx(opt.idx)}
                          className={`w-14 h-14 rounded-full overflow-hidden relative cursor-pointer flex-shrink-0 transition-all border-2 active:scale-95 ${
                            isSelected 
                              ? 'border-[#E5A995] shadow-[0_0_12px_rgba(229,169,149,0.5)] scale-105' 
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <img src={opt.url} className="w-full h-full object-cover" alt="avatar" />
                          {opt.isAi && (
                            <div className="absolute inset-0 bg-purple-900/30 flex items-center justify-center">
                              <span className="bg-purple-600 text-white text-[7px] px-1 rounded-sm scale-75 font-semibold">AI</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 全景背景 */}
                <div className="flex flex-col gap-2 px-4 flex-shrink-0">
                  <span className="text-xs text-[#E5A995] font-serif tracking-wider font-semibold">全景背景</span>
                  <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
                    {bgOptions.map((opt) => {
                      const isSelected = selectedBgIdx === opt.idx;
                      return (
                        <div 
                          key={opt.idx}
                          onClick={() => setSelectedBgIdx(opt.idx)}
                          className={`w-28 h-18 rounded-xl overflow-hidden relative cursor-pointer flex-shrink-0 transition-all border-2 active:scale-95 ${
                            isSelected 
                              ? 'border-[#E5A995] shadow-[0_0_12px_rgba(229,169,149,0.5)] scale-105' 
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <img src={opt.url} className="w-full h-full object-cover" alt="bg" />
                          {opt.isAi && (
                            <span className="absolute top-1.5 left-1.5 bg-purple-600 text-white text-[7px] px-1 rounded-sm scale-90 font-semibold origin-top-left">
                              AI 专属
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. 专属角色卡 */}
                <div className="flex flex-col gap-2 px-4 flex-shrink-0">
                  <span className="text-xs text-[#E5A995] font-serif tracking-wider font-semibold">专属角色卡</span>
                  <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
                    {cardOptions.map((opt) => {
                      const isSelected = selectedCardIdx === opt.idx;
                      return (
                        <div 
                          key={opt.idx}
                          onClick={() => setSelectedCardIdx(opt.idx)}
                          className={`w-20 h-28 rounded-xl overflow-hidden relative cursor-pointer flex-shrink-0 transition-all border-2 active:scale-95 ${
                            isSelected 
                              ? 'border-[#E5A995] shadow-[0_0_12px_rgba(229,169,149,0.5)] scale-105' 
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <img src={opt.url} className="w-full h-full object-cover" alt="card" />
                          {opt.isAi && (
                            <span className="absolute top-1.5 left-1.5 bg-purple-600 text-white text-[7px] px-1 rounded-sm scale-90 font-semibold origin-top-left">
                              AI 专属
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI 专属定制粒子按钮 - 免费与付费流转 */}
                <div className="px-4 py-2">
                  {!hasUsedFreeDraw ? (
                    <button
                      type="button"
                      disabled={isAiGenerating}
                      onClick={handleTriggerAiDraw}
                      className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold tracking-wider transition-all border bg-gradient-to-r from-purple-700 via-pink-600 to-rose-500 text-white border-transparent shadow-[0_0_15px_rgba(236,72,153,0.35)] animate-[pulse-slow_2.5s_infinite] hover:brightness-110 active:scale-[0.98]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E5A995] animate-pulse" />
                      <span>✨ 依据梦境提示词智能生成 (免费1次)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isAiGenerating}
                      onClick={() => {
                        if (starStones >= 10) {
                          setShowPaidConfirmModal(true);
                        } else {
                          setShowRechargeDrawer(true);
                        }
                      }}
                      className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold tracking-wider transition-all border bg-gradient-to-r from-[#20103A] to-[#120724] text-[#E5A995] border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:brightness-110 active:scale-[0.98] animate-[pulse-slow_3s_infinite]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      <span>🔮 依然不满意？消耗 10 梦境星石重新生成</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Bottom Action Area */}
              <div className="p-4 pb-6 border-t border-white/5 flex flex-col gap-3 flex-shrink-0 bg-[#0B0713]">
                <button
                  type="button"
                  onClick={() => handleCreateDream()}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#E5A995] to-[#E5A995]/80 text-[#0B0713] font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(229,169,149,0.25)] flex items-center justify-center gap-1.5"
                >
                  <span>确认生成，步入梦境 ▶</span>
                </button>
              </div>

              {/* 全屏流光画布渲染加载遮罩 */}
              {isAiGenerating && (
                <div className="absolute inset-0 bg-black/90 z-[70] flex flex-col justify-center items-center p-6 text-center animate-fade-in">
                  {/* Rainbow spinning circles */}
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-pink-500 animate-spin blur-[8px] opacity-80"></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 animate-[spin_5s_linear_infinite] blur-md opacity-60"></div>
                    <div className="absolute inset-2 rounded-full bg-[#0B0713] flex flex-col items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(229,169,149,0.3)]">
                      <Sparkles className="w-10 h-10 text-[#E5A995] animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-sm font-serif font-semibold text-white tracking-widest mb-3 animate-pulse">
                    🔮 全屏流光画布渲染中...
                  </h4>
                  <p className="text-[10px] text-soulom-muted max-w-[85%] leading-relaxed font-light">
                    正在解析梦境画卷：「{dreamInput}」<br />
                    召唤星尘引擎，绘制独一无二的专属浮雕立绘...
                  </p>
                  <div className="w-48 h-1 bg-white/5 rounded-full mt-6 overflow-hidden relative border border-white/5">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 animate-[loading-bar_3s_linear_forwards]" style={{ width: '100%' }} />
                  </div>
                </div>
              )}

              {/* 二次确认弹窗 */}
              {showPaidConfirmModal && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[80] flex items-center justify-center p-6 animate-fade-in">
                  <div className="w-full max-w-xs rounded-2xl glass-panel-heavy p-5 flex flex-col gap-4 relative animate-scale-up border border-soulom-border text-center">
                    <h3 className="font-serif text-xs text-[#E5A995] font-semibold tracking-wider">重塑画布确认</h3>
                    <p className="text-[11px] text-soulom-muted leading-relaxed font-light">
                      是否确认消耗 10 星石重塑画布？
                    </p>
                    <div className="flex gap-2.5 mt-2">
                      <button
                        type="button"
                        onClick={() => setShowPaidConfirmModal(false)}
                        className="flex-1 h-9 rounded-xl bg-white/5 border border-white/10 text-[10px] text-soulom-muted transition-colors"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPaidConfirmModal(false);
                          handleTriggerPaidAiDraw();
                        }}
                        className="flex-1 h-9 rounded-xl bg-[#E5A995] text-[#0B0713] text-[10px] font-semibold transition-all hover:bg-[#ebd0c7]"
                      >
                        确认消耗
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 星石共鸣补给站 充值抽屉 (BottomSheet) */}
              {showRechargeDrawer && (
                <>
                  <div 
                    onClick={() => setShowRechargeDrawer(false)}
                    className="absolute inset-0 bg-black/75 backdrop-blur-xs z-[80] animate-fade-in"
                  />
                  <div className="absolute bottom-0 left-0 right-0 w-full max-w-md mx-auto rounded-t-[32px] bg-[#140C22]/98 border-t border-white/10 backdrop-blur-2xl p-6 flex flex-col gap-4 animate-slide-up z-[90] shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">
                    <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-1 flex-shrink-0" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#E5A995] tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> 星石共鸣补给站
                      </span>
                      <span className="text-[9px] text-soulom-muted font-light">
                        当前星石余额: <span className="text-[#E5A995] font-semibold">{starStones}</span>
                      </span>
                    </div>
                    
                    <p className="text-[10px] text-soulom-muted leading-relaxed font-light mb-1">
                      您的星石余额不足以重塑画布，请选择充值档位进行共鸣补给：
                    </p>
                    
                    <div className="flex flex-col gap-2.5">
                      {[
                        { stones: 60, price: 6, label: "60 梦境星石" },
                        { stones: 300, price: 30, label: "300 梦境星石", badge: "超值推荐" },
                        { stones: 680, price: 68, label: "680 梦境星石", badge: "心动首选" }
                      ].map((tier, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleTriggerRecharge(tier.stones)}
                          className="w-full h-[58px] rounded-xl bg-white/5 border border-white/[0.05] hover:border-[#E5A995]/30 flex items-center justify-between px-4 cursor-pointer transition-all active:scale-[0.99] hover:bg-white/10 group relative overflow-hidden"
                        >
                          <div className="flex flex-col justify-center text-left">
                            <span className="text-xs font-serif font-semibold text-[#E5A995] tracking-wide">{tier.label}</span>
                            <span className="text-[8px] text-white/35 font-light mt-0.5">解锁更多专属立绘</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {tier.badge && (
                              <span className="px-1.5 py-0.5 rounded bg-[#E5A995]/15 border border-[#E5A995]/30 text-[#E5A995] text-[7px] scale-90">
                                {tier.badge}
                              </span>
                            )}
                            <span className="text-xs font-bold text-[#E5A995] font-serif group-hover:scale-105 transition-transform">
                              ¥{tier.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setShowRechargeDrawer(false)}
                      className="w-full h-11 rounded-xl bg-white/5 border border-white/5 text-xs text-soulom-muted hover:text-soulom-text transition-colors mt-2"
                    >
                      放弃充值
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })()}

        {/* ========================================================
            隐私解锁遮罩 (Privacy Lock Overlay)
            ======================================================== */}
        {isLockScreenVisible && (
          <div className="absolute inset-0 bg-soulom-bg z-99 flex flex-col justify-between py-12 px-6 animate-fade-in border border-soulom-border">
            {/* 上部 */}
            <div className="text-center mt-6">
              <div className="w-12 h-12 rounded-full border border-[#E5A995]/30 flex items-center justify-center mx-auto bg-[#E5A995]/10">
                <Lock className="w-5 h-5 text-[#E5A995] animate-pulse" />
              </div>
              <h2 className="text-base text-soulom-text mt-4 font-serif">隐私锁已启用</h2>
              <p className="text-[10px] text-soulom-muted mt-1 pl-0.5">请按解锁轨迹连接九宫格密码</p>
            </div>

            {/* 中部模拟九宫格解锁 */}
            <div className="my-auto w-64 h-64 mx-auto flex flex-col justify-center items-center gap-6">
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                  const isActive = currentGesture.includes(num);
                  return (
                    <button 
                      key={num}
                      type="button"
                      onClick={() => handleGesturePointClick(num)}
                      className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                        isActive 
                          ? 'border-[#E5A995] bg-[#E5A995]/20 shadow-[0_0_12px_rgba(229,169,149,0.3)] text-[#E5A995] scale-110' 
                          : 'border-soulom-border bg-soulom-inputBg text-soulom-muted hover:border-[#E5A995]/30'
                      }`}
                    >
                      <span className="text-xs font-light font-sans">{num}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* 轨迹实时指示 */}
              <div className="text-[10px] text-soulom-muted font-light mt-2">
                当前轨迹: {currentGesture.length > 0 ? currentGesture.join(' ➔ ') : '等待按下...'}
              </div>
            </div>

            {/* 下部 */}
            <div className="text-center px-4 flex flex-col gap-2">
              <span className="text-[9px] text-soulom-muted block">温馨提示：按 L 轨线连接：(1 ➔ 4 ➔ 7 ➔ 8 ➔ 9) 可迅速解锁</span>
              <button 
                onClick={() => {
                  setIsLockScreenVisible(false);
                  setIsLoggedIn(false); // Cancel back to login
                }}
                className="text-xs text-[#E5A995]/80 hover:text-[#E5A995] underline"
              >
                取消解锁，返回登录页
              </button>
            </div>
          </div>
        )}

        {/* 二级账户安全管理 */}
        {isAccountModalOpen && (
          <div className="absolute inset-0 bg-[#0B0713]/85 backdrop-blur-md z-[80] flex flex-col justify-center p-6 animate-fade-in">
            <div className="w-full bg-[#1F1635]/90 border border-white/[0.08] rounded-3xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col gap-4 relative">
              <div className="text-center pb-2 border-b border-white/5">
                <h3 className="text-base text-[#F8F9FA] font-serif">二级账户安全管理</h3>
                <p className="text-[10px] text-soulom-muted mt-1">管理个人私密凭证与保护状态</p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-soulom-muted font-light">绑定手机</span>
                  <span className="text-soulom-text font-medium">138 **** 8888</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-soulom-muted font-light">服务状态</span>
                  <span className="text-emerald-400 bg-emerald-950/30 border border-emerald-900/30 px-2 py-0.5 rounded-full scale-95">🔒 匿名加密保护已开启</span>
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                  <span className="text-xs text-soulom-muted font-light">登录凭证密码</span>
                  {!isPasswordEditing ? (
                    <div className="flex justify-between items-center bg-white/5 border border-white/5 rounded-xl px-3 h-10">
                      <span className="text-xs text-soulom-text font-mono">
                        {"*".repeat(accountPassword.length)}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => {
                          setTempPassword(accountPassword);
                          setIsPasswordEditing(true);
                        }}
                        className="text-[11px] text-[#E5A995] hover:underline bg-transparent border-0 cursor-pointer"
                      >
                        修改密码
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={tempPassword} 
                        onChange={(e) => setTempPassword(e.target.value)}
                        placeholder="输入新密码..." 
                        className="flex-1 h-9 px-3 rounded-lg text-xs bg-white/5 border border-white/10 text-[#F8F9FA] focus:outline-none focus:border-[#E5A995]/40"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (!tempPassword.trim()) {
                            showToast("密码不能为空");
                            return;
                          }
                          setAccountPassword(tempPassword);
                          setIsPasswordEditing(false);
                          showToast("安全密码修改成功");
                        }}
                        className="px-3 h-9 rounded-lg text-xs bg-[#E5A995] text-white cursor-pointer"
                      >
                        保存
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsPasswordEditing(false)}
                        className="px-3 h-9 rounded-lg text-xs bg-white/10 text-soulom-muted cursor-pointer"
                      >
                        取消
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => {
                  setIsAccountModalOpen(false);
                  setIsPasswordEditing(false);
                }}
                className="w-full h-10 mt-2 bg-[#E5A995]/20 hover:bg-[#E5A995]/30 text-[#E5A995] text-xs font-medium rounded-xl border border-[#E5A995]/20 cursor-pointer active:scale-95 transition-all"
              >
                返回个人中心
              </button>
            </div>
          </div>
        )}

        {/* OTA 固件升级模拟弹窗 */}
        {isOtaModalOpen && (
          <div className="absolute inset-0 bg-[#0B0713]/90 backdrop-blur-md z-[80] flex flex-col justify-center items-center p-6 animate-fade-in">
            <div className="w-full max-w-xs bg-[#1F1635]/90 border border-white/[0.08] rounded-3xl p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col items-center">
              <h3 className="text-base text-[#F8F9FA] font-serif mb-1">无线 OTA 固件升级</h3>
              <p className="text-[10px] text-soulom-muted mb-6 leading-relaxed">正在通过蓝牙通道写入设备核心配置，请勿切断连接...</p>
              
              {/* 环形进度条 */}
              <div className="relative w-28 h-28 mb-6 flex items-center justify-center select-none">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="46" stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="transparent" />
                  <circle cx="56" cy="56" r="46" stroke="#E5A995" strokeWidth="5" fill="transparent"
                    strokeDasharray={2 * Math.PI * 46}
                    strokeDashoffset={2 * Math.PI * 46 * (1 - otaProgress / 100)}
                    className="transition-all duration-100 ease-out"
                  />
                </svg>
                <span className="absolute text-base text-[#E5A995] font-sans font-medium">{otaProgress}%</span>
              </div>
              
              <div className="text-[10px] text-[#E5A995]/80 font-light tracking-wide animate-pulse">
                {otaProgress < 100 ? "📦 正在向硬件写入封包..." : "✅ 升级写入成功，重启连接中..."}
              </div>
            </div>
          </div>
        )}

        {/* 物理抹除资产双重确认弹窗 */}
        {isErasureModalOpen && (
          <div className="absolute inset-0 bg-[#0B0713]/90 backdrop-blur-md z-[80] flex flex-col justify-center p-6 animate-fade-in">
            <div className="w-full bg-[#1F1635]/95 border border-red-500/20 rounded-3xl p-5 shadow-[0_8px_32px_rgba(239,68,68,0.1)] flex flex-col gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                <Trash2 className="w-5 h-5 text-red-400 animate-bounce" />
              </div>
              
              {erasureStep === 1 ? (
                <>
                  <h3 className="text-base text-red-400 font-serif">⚠️ 物理抹除梦境记忆警告</h3>
                  <p className="text-xs text-soulom-muted font-light leading-relaxed">
                    此操作将物理粉碎并物理抹除您在 Soulom 的所有聊天资产、对话记录、以及自定义捕获梦境分身。本指令不可逆，数据无法被复原。
                  </p>
                  <div className="flex flex-col gap-2.5 mt-2">
                    <button 
                      type="button" 
                      onClick={() => setErasureStep(2)}
                      className="w-full h-11 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-medium rounded-xl border border-red-500/30 cursor-pointer active:scale-95 transition-all"
                    >
                      💥 确认不可逆抹除，下一步
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsErasureModalOpen(false)}
                      className="w-full h-11 bg-white/5 hover:bg-white/10 text-soulom-text text-xs rounded-xl cursor-pointer"
                    >
                      暂且保留回忆
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-base text-red-500 font-serif">🔒 终极清除指令核准</h3>
                  <p className="text-xs text-soulom-muted font-light leading-relaxed">
                    您是否真的要将所有梦境数据化为虚无星尘？一旦执行，您的灵魂契约与触感缓存将被永久物理粉碎。
                  </p>
                  <div className="flex flex-col gap-2.5 mt-2">
                    <button 
                      type="button" 
                      onClick={() => {
                        // Reset everything
                        setChatMessages(INITIAL_CHAT_MESSAGES);
                        setStories(INITIAL_STORIES);
                        setIsErasureModalOpen(false);
                        setCurrentTab('plaza');
                        showToast("梦境记忆已彻底物理抹除并化为星尘");
                      }}
                      className="w-full h-11 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold rounded-xl cursor-pointer active:scale-95 transition-all shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                    >
                      🔥 物理粉碎 · 终结梦境
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsErasureModalOpen(false)}
                      className="w-full h-11 bg-white/5 hover:bg-white/10 text-soulom-text text-xs rounded-xl cursor-pointer"
                    >
                      取消，保留数据
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* 合规政策阅读弹窗 */}
        {complianceDoc && (
          <div className="absolute inset-0 bg-[#0B0713]/85 backdrop-blur-md z-[80] flex flex-col justify-center p-6 animate-fade-in">
            <div className="w-full max-h-[85%] bg-[#1F1635]/95 border border-white/[0.08] rounded-3xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col gap-4 relative">
              <div className="text-center pb-2 border-b border-white/5">
                <h3 className="text-base text-[#F8F9FA] font-serif">
                  {complianceDoc === 'userAgreement' && "用户使用协议"}
                  {complianceDoc === 'privacyPolicy' && "隐私权与数据保护政策"}
                  {complianceDoc === 'complianceGuide' && "平台安全与合规指引"}
                </h3>
                <p className="text-[9px] text-[#E5A995] tracking-widest mt-1">SOULOM COMPLIANCE DOCUMENT</p>
              </div>

              {/* 文档滚动正文 */}
              <div className="flex-1 overflow-y-auto pr-1 text-[11px] text-soulom-muted font-light leading-relaxed text-left space-y-3 max-h-[280px] scrollbar-none">
                {complianceDoc === 'userAgreement' && (
                  <>
                    <p className="font-medium text-white/80">一、 服务条款与接受</p>
                    <p>欢迎使用 Soulom。本协议由平台所有方与用户共同缔结。当您开始注册、登录或使用我们的智能触模拟及 AI 伴侣服务时，即视为您已完整阅读并同意接受本协议的所有条款。</p>
                    <p className="font-medium text-white/80">二、 用户账户与实名验证</p>
                    <p>您应妥善保管您的共鸣登录账户与隐私防线手势轨迹。平台采用全方位匿名沙盒机制。任何由于您泄露个人轨迹密码所造成的本地数据风险，由用户自行承担。</p>
                    <p className="font-medium text-white/80">三、 智能硬件与触感同步</p>
                    <p>本产品提供的蓝牙触感模拟为女性悦己与剧本共鸣之数字娱乐用途。请依照硬件安全规范操作。禁止用于任何商业性质的公开展示或违规操作行为。</p>
                  </>
                )}
                {complianceDoc === 'privacyPolicy' && (
                  <>
                    <p className="font-medium text-white/80">一、 零数据变现承诺</p>
                    <p>Soulom 严格秉承“灵魂私密”的女性向最高安全准则。平台向您郑重承诺，绝不将用户的任何聊天资产、对话特征分析或触感参数售卖给第三方，所有数据均做高级脱敏处理。</p>
                    <p className="font-medium text-white/80">二、 匿名加密与本地缓存</p>
                    <p>为确保绝对的安全感，您的聊天进度在本地与沙盒同步加密。当您点击“物理清除梦境”时，服务器与本地的所有缓存资产将会进行不可逆的二进制物理覆写粉碎。</p>
                    <p className="font-medium text-white/80">三、 绝无敏感短信用途</p>
                    <p>为了免除您对私密工具外露的担忧，Soulom 平台承诺绝不通过短信向您发送任何含有产品、玩具或成人字样的敏感验证信息，所有提醒均采用安全隐蔽的推送设计。</p>
                  </>
                )}
                {complianceDoc === 'complianceGuide' && (
                  <>
                    <p className="font-medium text-white/80">一、 硬件兼容与温控安全</p>
                    <p>Soulom 设备遵循国际防尘防水与安全电压规范。温控最高限制为 42°C，防止低温烫伤。当产品处于非活动状态超过 15 分钟，会自动进入深度休眠以保护电池安全。</p>
                    <p className="font-medium text-white/80">二、 压力感应与物理自适应</p>
                    <p>当您开启“智能压力感应”后，波形频率会随您的局部挤压反馈实时拟合。请避免强行机械折弯或外部硬物刮擦传感器，保障长久舒适的使用体验。</p>
                    <p className="font-medium text-white/80">三、 上架合规与安全防线</p>
                    <p>本原型软件完全符合主流应用商店针对社交娱乐、个人隐私防护以及硬件配件连接的全部安全合规基准审核要求，切实筑牢用户的个人防线。</p>
                  </>
                )}
              </div>

              <button 
                type="button" 
                onClick={() => setComplianceDoc(null)}
                className="w-full h-10 mt-2 bg-[#E5A995] text-white text-xs font-medium rounded-xl cursor-pointer active:scale-95 transition-all shadow-[0_4px_12px_rgba(229,169,149,0.2)]"
              >
                已阅读并同意该条款
              </button>
            </div>
          </div>
        )}

        {/* 个人信息修改 BottomSheet */}
        {isProfileEditOpen && (
          <div className="absolute inset-0 bg-[#0B0713]/60 backdrop-blur-sm z-[90] flex flex-col justify-end animate-fade-in">
            {/* Click outside to close */}
            <div className="absolute inset-0 -z-10 animate-fade-in" onClick={() => setIsProfileEditOpen(false)}></div>
            
            <div className="w-full bg-[#1F1635] border-t border-white/10 rounded-t-3xl p-5 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-4 animate-slide-up relative">
              {/* Top pull indicator */}
              <div className="w-10 h-1 bg-white/10 rounded-full mx-auto -mt-2 mb-1"></div>
              
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-sm font-serif text-[#E5A995] tracking-widest font-medium">✏️ 修改个人梦境卡</span>
                <button 
                  type="button"
                  onClick={() => setIsProfileEditOpen(false)}
                  className="text-xs text-soulom-muted hover:text-soulom-text cursor-pointer bg-transparent border-0"
                >
                  关闭
                </button>
              </div>

              {/* 1. 更换头像 */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-white/40 tracking-wider">选择灵魂头像</span>
                <div className="flex gap-4 py-1">
                  {[
                    "/avatar.png",
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=150&auto=format&fit=crop"
                  ].map((url, i) => {
                    const isSelected = profileAvatar === url;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setProfileAvatar(url)}
                        className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected ? 'border-[#E5A995] scale-105 shadow-[0_0_8px_rgba(229,169,149,0.4)]' : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <img src={url} alt="avatar option" className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. 修改昵称 */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-white/40 tracking-wider">匿名昵称</span>
                <input 
                  type="text" 
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="输入匿名昵称..."
                  className="w-full h-10 px-4 rounded-xl text-xs bg-white/5 border border-white/10 text-[#F8F9FA] focus:outline-none focus:border-[#E5A995]/40"
                />
              </div>

              {/* 3. 修改生日 */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-white/40 tracking-wider">筑梦师生日 (纪念特权)</span>
                <input 
                  type="text" 
                  value={profileBirthday}
                  onChange={(e) => setProfileBirthday(e.target.value)}
                  placeholder="格式如: 06-17"
                  className="w-full h-10 px-4 rounded-xl text-xs bg-white/5 border border-white/10 text-[#F8F9FA] focus:outline-none focus:border-[#E5A995]/40"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!profileName.trim()) {
                    showToast("昵称不能为空");
                    return;
                  }
                  setIsProfileEditOpen(false);
                  showToast("个人信息修改成功");
                }}
                className="w-full h-10 mt-1 bg-gradient-to-r from-[#E5A995]/80 to-[#D4A373]/80 hover:shadow-[0_4px_15px_rgba(229,169,149,0.25)] text-white text-xs font-semibold rounded-xl cursor-pointer active:scale-95 transition-all border-0"
              >
                保存并载入梦境
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
