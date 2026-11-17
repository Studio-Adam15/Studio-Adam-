/* ==========================================================================
   STUDIO ADAM — Standalone Interactive Script (script.js)
   Handles Bilingual AR/EN, Home <-> Portfolio Routing, Portfolio Filter &
   Cinema Lightbox, JOD Package Calculator, and WhatsApp Inquiry Modal.
   ========================================================================== */

(() => {
  'use strict';

  const STUDIO_CONFIG = {
    handle: '@studioadam.co',
    phoneFormatted: '078 513 1386',
    whatsappUrl: 'https://wa.me/962785131386',
    instagramUrl: 'https://www.instagram.com/studioadam.co',
  };

  /* ------------------------------------------------------------------------
     Portfolio Catalog (7 UGC Commercial Reels + 8 Social & Brand Designs)
     ------------------------------------------------------------------------ */
  const PORTFOLIO_VIDEOS = [
    {
      id: 'ugc-maison-aashna',
      kind: 'video',
      src: './assets/videos/911534395_1794854473722034_43f48788.mp4',
      titleAr: 'إعلان مجوهرات فاخر',
      titleEn: 'Luxury Jewelry Reveal',
      clientAr: 'Maison Aashna',
      clientEn: 'Maison Aashna',
      categoryAr: 'مجوهرات وفخامة',
      categoryEn: 'Fine Jewelry',
      formatAr: 'ريلز إعلاني · 9:16',
      formatEn: 'UGC Reel · 9:16',
      briefAr: 'إعلان UGC بصري يبرز بريق الألماس وتفاصيل العلبة المخملية بإضاءة دافئة ومونتاج ناعم.',
      briefEn: 'High-retention luxury product reveal showcasing emerald velvet packaging, natural light sparkle, and lifestyle framing.',
      aspect: '9/16',
    },
    {
      id: 'ugc-dior-sauvage',
      kind: 'video',
      src: './assets/videos/148840581_1794854424075580_df82cea7.mp4',
      titleAr: 'تجسيد عطر Sauvage',
      titleEn: 'Sauvage Fragrance Spot',
      clientAr: 'Dior Sauvage',
      clientEn: 'Dior Sauvage',
      categoryAr: 'عطور ومستحضرات',
      categoryEn: 'Fragrance Commercial',
      formatAr: 'فيديو إعلاني · 9:16',
      formatEn: 'Commercial Reel · 9:16',
      briefAr: 'إخراج إعلاني ديناميكي يجمع بين انسيابية السوائل والخشب الطبيعي والضباب السينمائي.',
      briefEn: 'Dynamic liquid-splash macro transitions paired with natural driftwood and smoky studio atmospherics.',
      aspect: '9/16',
    },
    {
      id: 'ugc-burger-kubes',
      kind: 'video',
      src: './assets/videos/704781346_1794854344343448_805e2e55.mp4',
      titleAr: 'حملة برجر كريسبي',
      titleEn: 'Crispy Burger Ad Spot',
      clientAr: 'Burger Kubes',
      clientEn: 'Burger Kubes',
      categoryAr: 'مطاعم وأغذية',
      categoryEn: 'Food & Beverage',
      formatAr: 'إعلان سوشيال · 9:16',
      formatEn: 'Social Ad · 9:16',
      briefAr: 'فيديو إعلاني شهي بحركة بطيئة للصوص الذائب مع لقطات تذوق عالية الجاذبية لرفع الطلبات.',
      briefEn: 'Crave-worthy slow-motion cheddar pour, crisp texture close-ups, and upbeat talent reaction.',
      aspect: '9/16',
    },
    {
      id: 'ugc-casio-watch',
      kind: 'video',
      src: './assets/videos/211260033_1794854304753318_7a16cc4b.mp4',
      titleAr: 'استعراض ساعة Casio الذهبية',
      titleEn: 'Casio Mint & Gold',
      clientAr: 'Casio Timepieces',
      clientEn: 'Casio Timepieces',
      categoryAr: 'ساعات وإكسسوارات',
      categoryEn: 'Watches & Accessories',
      formatAr: 'ماكرو إعلاني · 9:16',
      formatEn: 'Product Film · 9:16',
      briefAr: 'لقطات ماكرو دقيقة لميناء الساعة الأخضر وسوارها المعدني على خلفية دخان زمردي.',
      briefEn: 'Precision macro sweeps highlighting sunburst mint dial reflections and brushed gold link craftsmanship.',
      aspect: '9/16',
    },
    {
      id: 'ugc-interior-chair',
      kind: 'video',
      src: './assets/videos/VID_20261116_035518_236_2e9c32ac.mp4',
      titleAr: 'تحول ديكور ثلاثي الأبعاد',
      titleEn: '3D Interior Morph',
      clientAr: 'استوديو الأثاث الحديث',
      clientEn: 'Modern Living Studio',
      categoryAr: 'أثاث وتصميم داخلي',
      categoryEn: 'Furniture & Interiors',
      formatAr: 'موشن وCGI · 9:16',
      formatEn: 'CGI Motion · 9:16',
      briefAr: 'انتقال إبداعي بتغيير خامات الكرسي بفرقعة أصابع وصولاً إلى بناء غرفة معيشة متكاملة.',
      briefEn: 'Interactive finger-snap fabric cycling followed by architectural room assembly in warm studio lighting.',
      aspect: '9/16',
    },
    {
      id: 'ugc-glasses-drop',
      kind: 'video',
      src: './assets/videos/858343885_1794499128715709_3da86cc8.mp4',
      titleAr: 'إطلاق تشكيلة النظارات',
      titleEn: 'The Glasses Drop',
      clientAr: 'Atelier Eyewear',
      clientEn: 'Atelier Eyewear',
      categoryAr: 'أزياء ونظارات',
      categoryEn: 'Fashion & Eyewear',
      formatAr: 'ريلز أزياء · 9:16',
      formatEn: 'Fashion Reel · 9:16',
      briefAr: 'فيديو إطلالات أزياء متناغم مع زوايا كاميرا متغيرة وإيقاع سريع يبرز تصميم النظارة.',
      briefEn: 'High-energy studio lookbook with whip transitions and editorial eyewear framing.',
      aspect: '9/16',
    },
    {
      id: 'ugc-istatieh-decor',
      kind: 'video',
      src: './assets/videos/517367260_1794775159921932_83d3f02b.mp4',
      titleAr: 'إعلان ديكور وورق جدران',
      titleEn: 'Istatieh Decor Showcase',
      clientAr: 'Istatieh Decor',
      clientEn: 'Istatieh Decor',
      categoryAr: 'ديكور وستائر',
      categoryEn: 'Wallpapers & Curtains',
      formatAr: 'ريلز معماري · 9:16',
      formatEn: 'Architectural Reel · 9:16',
      briefAr: 'جولة بصرية ناعمة خلف الستائر الشفافة لاستعراض تشكيلات ورق الجدران الفاخرة.',
      briefEn: 'Silky curtain-reveal transitions guiding viewers across botanical, moody, and classic living spaces.',
      aspect: '9/16',
    },
  ];

  const PORTFOLIO_DESIGNS = [
    {
      id: 'design-bunzos',
      kind: 'design',
      src: './assets/images/file_00000000e73081f9bfd62d785ab21996_43103a27.png',
      titleAr: 'بوستر إعلاني — Bunzo’s',
      titleEn: 'Bunzo’s Burger Poster',
      clientAr: 'Bunzo’s',
      clientEn: 'Bunzo’s',
      categoryAr: 'سوشيال ميديا مطاعم',
      categoryEn: 'Food Campaign',
      formatAr: 'تصميم إنستغرام · 4:5',
      formatEn: 'Social Poster · 4:5',
      briefAr: 'تصميم إعلاني بخلفيّة عنابية عميقة يبرز تفاصيل البرجر والجبنة الذائبة مع أيقونات المكونات.',
      briefEn: 'Deep burgundy studio composition with bold background display typography and crisp ingredient callouts.',
      aspect: '4/5',
    },
    {
      id: 'design-nivea',
      kind: 'design',
      src: './assets/images/file_00000000d9648211a384b30e7d6dda2a_22162170.png',
      titleAr: 'حملة عناية — NIVEA',
      titleEn: 'NIVEA Shea Smooth',
      clientAr: 'NIVEA',
      clientEn: 'NIVEA',
      categoryAr: 'عناية وجمال',
      categoryEn: 'Skincare & Beauty',
      formatAr: 'تصميم إنستغرام · 4:5',
      formatEn: 'Social Poster · 4:5',
      briefAr: 'إخراج بصري ناعم بإضاءة حريرية وألوان أرجوانية هادئة تبرز زبدة الشيا ونعومة المنتج.',
      briefEn: 'Silky draped fabric lighting, tactile shea butter macro details, and balanced editorial serif headlines.',
      aspect: '4/5',
    },
    {
      id: 'design-sauvage',
      kind: 'design',
      src: './assets/images/file_00000000101c81f4a99f9e97c1eaeb57_b99af8ee.png',
      titleAr: 'بوستر عطر — Dior Sauvage',
      titleEn: 'Dior Sauvage Editorial',
      clientAr: 'Dior',
      clientEn: 'Dior',
      categoryAr: 'عطور فاخرة',
      categoryEn: 'Luxury Fragrance',
      formatAr: 'تصميم إنستغرام · 4:5',
      formatEn: 'Social Poster · 4:5',
      briefAr: 'تكوين درامي على صخور داكنة وإضاءة موجهة لإبراز فخامة الزجاجة وثبات العطر.',
      briefEn: 'Dramatic midnight stone staging with architectural spotlighting and minimal spec grid.',
      aspect: '4/5',
    },
    {
      id: 'design-babor',
      kind: 'design',
      src: './assets/images/file_00000000165881f4b716c6bbc35f96bc_54587805.png',
      titleAr: 'بوست طبيعي — Doctor Babor',
      titleEn: 'Doctor Babor Gel Cream',
      clientAr: 'Doctor Babor',
      clientEn: 'Doctor Babor',
      categoryAr: 'مستحضرات طبية',
      categoryEn: 'Botanical Skincare',
      formatAr: 'تصميم إنستغرام · 4:5',
      formatEn: 'Social Poster · 4:5',
      briefAr: 'تصميم يجمع بين حيوية قطرة الجل وأوراق الصبار مع هيكلة واضحة لفوائد المنتج الأساسية.',
      briefEn: 'Fresh emerald botanical visual with crisp macro serum drop and scannable 3-point benefit hierarchy.',
      aspect: '4/5',
    },
    {
      id: 'design-margherita',
      kind: 'design',
      src: './assets/images/file_00000000044881f6999eb2e5f077c16e_71062104.png',
      titleAr: 'بوست بيتزا مارغريتا',
      titleEn: 'Artisanal Margherita Ad',
      clientAr: 'Pizzeria Artisan',
      clientEn: 'Pizzeria Artisan',
      categoryAr: 'مطاعم إيطالية',
      categoryEn: 'Artisanal Food',
      formatAr: 'تصميم إنستغرام · 4:5',
      formatEn: 'Social Poster · 4:5',
      briefAr: 'تصوير علوي على رخام دافئ يبرز قرمشة الأطراف والريحان الطازج مع شريط مكونات زجاجي.',
      briefEn: 'Warm travertine stone flat-lay featuring wood-fired crust textures and frosted ingredient bar.',
      aspect: '4/5',
    },
    {
      id: 'design-slice-life',
      kind: 'design',
      src: './assets/images/file_00000000aa9081f485600eabafe69ab8_2371eff9.png',
      titleAr: 'حملة تحريرية — Slice of Life',
      titleEn: 'Slice of the Good Life',
      clientAr: 'Oven-Fresh Pizza',
      clientEn: 'Oven-Fresh Pizza',
      categoryAr: 'هوية ومطاعم',
      categoryEn: 'Editorial Food Ad',
      formatAr: 'تصميم إنستغرام · 4:5',
      formatEn: 'Social Poster · 4:5',
      briefAr: 'أسلوب مجلات عصري يوازن بين التايبوغرافي القوي باللون القرمزي ولقطة البيتزا الساخنة.',
      briefEn: 'Asymmetric Swiss-editorial poster pairing bold crimson serif type with rich overhead photography.',
      aspect: '4/5',
    },
    {
      id: 'design-coastals',
      kind: 'design',
      src: './assets/images/file_0000000019c482109038add7d6b5e754_bf80b48a.png',
      titleAr: 'بوست مشروب صيفي — Coastal’s',
      titleEn: 'Coastal’s Watermelon Can',
      clientAr: 'Coastal’s',
      clientEn: 'Coastal’s',
      categoryAr: 'مشروبات ومنتجات',
      categoryEn: 'Beverage Campaign',
      formatAr: 'تصميم إنستغرام · 4:5',
      formatEn: 'Social Poster · 4:5',
      briefAr: 'إضاءة شمسية مشرقة مع قطرات التكثيف وشرائح البطيخ المنعشة لإبراز برودة المنتج.',
      briefEn: 'Sun-drenched coral backdrop with crisp condensation droplets and dynamic watermelon slice framing.',
      aspect: '4/5',
    },
    {
      id: 'design-istatieh-logo',
      kind: 'design',
      src: './assets/images/file_00000000d32c82469ceaf81d65fae59b_2ba959b8.png',
      titleAr: 'هوية وشعار — Istatieh Decor',
      titleEn: 'Istatieh Decor Identity',
      clientAr: 'Istatieh Decor',
      clientEn: 'Istatieh Decor',
      categoryAr: 'شعارات وهوية بصرية',
      categoryEn: 'Brand Identity',
      formatAr: 'تصميم شعار · 1:1',
      formatEn: 'Logo Lockup · 1:1',
      briefAr: 'تصميم شعار كلاسيكي راقٍ بخطوط سيريف متزنة ولمسة برغندي دافئة تعكس فخامة الديكور.',
      briefEn: 'Refined serif brand wordmark in deep oxblood on warm ivory paper, balancing heritage and poise.',
      aspect: '1/1',
    },
  ];

  /* ------------------------------------------------------------------------
     Bilingual Dictionary (AR / EN)
     ------------------------------------------------------------------------ */
  const I18N = {
    ar: {
      brandSub: 'استوديو آدم · الهوية والتصميم',
      navPortfolio: 'معرض الأعمال',
      navLaunch: 'عرض الافتتاح',
      navPackages: 'الباقات',
      navCalculator: 'الحاسبة',
      navServices: 'خدماتنا',
      navReviews: 'آراء العملاء',
      bookNow: 'احجز الآن',
      chipFastTitle: 'تسليم سريع',
      chipFastSub: 'خلال 2 إلى 4 أيام عمل',
      chipCalcTitle: 'حساب فوري',
      chipCalcSub: 'بالدينار الأردني',
      heroBadge: 'حساب فوري بالدينار الأردني',
      heroTitleHtml: 'هويتك البصرية تبدأ <span class="accent-mint">من هنا</span>',
      heroSubtitle: 'شعارات، هوية بصرية، بوستات وريلز، ومواقع إلكترونية — تصميم يحوّل فكرتك إلى علامة يشاركها الناس.',
      heroCtaExplore: 'اكتشف الباقات',
      heroCtaCalc: 'احسب باقتك',
      launchBadge: 'عرض الافتتاح',
      launchTitle: 'باقة انطلاقة',
      launchSub: 'كل اللي يحتاجه محلك عشان يبدأ على السوشيال ميديا بقوة',
      launchFeat1: 'لوجو احترافي مع هوية لونية متكاملة',
      launchFeat2: '10 بوستات إعلانية جاهزة للنشر',
      launchFeat3: 'صنع موقع إلكتروني احترافي (مشمول مجاناً في العرض)',
      launchPrice: '25 دينار',
      onlyLabel: 'فقط',
      launchNote: 'سعر خاص لأول 5 عملاء — الكمية محدودة',
      launchBtn: 'راسلنا دايركت واحجز مكانك',
      previewKicker: 'معرض الأعمال · إعلانات وتصاميم حقيقية',
      previewTitle: 'شاهد جودة أعمالنا على أرض الواقع',
      previewDesc: 'هذه لمحة سريعة من أحدث إعلانات الـ UGC. انتقل إلى صفحة معرض الأعمال المستقلة لمشاهدة الفيديوهات السبعة الكاملة وتصاميم السوشيال ميديا.',
      metaReelsCount: '7 فيديوهات UGC',
      metaDesignsCount: '8 تصاميم سوشيال',
      viewPortfolioBtn: 'عرض الأعمال (15 عمل)',
      identityKicker: 'الهوية البصرية واللونية',
      identityTitle: 'الألوان والهوية: فلسفة التصميم المعماري النقي',
      identityDesc: 'تعتمد هوية ستوديو آدم على لونين رئيسيين متكاملين: البيترول تيل الداكن (#124E52) مع الأوف وايت العاجي (#F5F0E6)، لإنشاء حضور فخم ومميز يدوم في ذاكرة الجمهور.',
      swatchPrimaryRole: 'اللون الأساسي للهوية',
      swatchPrimaryDesc: 'يرمز إلى الاحترافية والعمق والثقة، ويمنح العلامة التجارية طابعاً معمارياً مهيباً بعيداً عن الألوان التقليدية المكررة.',
      swatchBgRole: 'اللون الأساسي للخلفيات',
      swatchBgDesc: 'اللون الأساسي للخلفيات والمساحات الفسيحة. يضيف الهدوء والأناقة، ويبرز الخطوط والتكوينات الهندسية والنصوص بوضوح مريح للعين.',
      swatchAppCore: 'الاستخدام: ركيزة أساسية',
      studioSlogan: 'أنا اللي بصنع من الفكرة أثرًا.',
      deliverablesSub: 'مخرجات متكاملة تُسلَّم لك بجودة استثنائية وجاهزة للنشر الفوري',
      servicesKicker: 'خدماتنا',
      servicesTitle: 'الهوية، والمحتوى، والموقع — تحت سقف واحد',
      servicesDesc: 'كل ما يحتاجه محلك ليظهر احترافياً على الإنترنت.',
      calcKicker: 'حاسبة فورية بالدينار الأردني',
      calcTitle: 'ابنِ باقتك المخصصة بنفسك',
      calcDesc: 'اختر ما تحتاجه وشاهد السعر يتكوّن أمامك لحظة بلحظة.',
      calcStep1Title: 'الشعار والهوية البصرية',
      calcStep1Sub: 'أساس علامتك — اختر مستوى الهوية الذي تحتاجه',
      calcFixed: 'ثابت',
      logoOptNone: 'لدي شعار جاهز',
      logoOptNoneSub: 'بدون تصميم شعار',
      logoOptPro: 'لوجو احترافي + ألوان',
      logoOptProSub: 'شعار أصلي معتمد',
      logoOptFull: 'هوية بصرية شاملة',
      logoOptFullSub: 'دليل خطوط ومقاسات',
      jodShort: 'د.أ',
      calcStep2Title: 'عدد البوستات الإعلانية',
      calcStep2Sub: 'تصاميم توقف التمرير وتوصل رسالتك على إنستغرام (1 د.أ / بوست)',
      calcStep3Title: 'عدد فيديوهات الريلز والموشن',
      calcStep3Sub: 'فيديوهات قصيرة جذابة ومونتاج عصري (3 د.أ / فيديو)',
      presetsLabel: 'خيارات سريعة:',
      calcStep4Title: 'صنع موقع إلكتروني احترافي',
      calcStep4Sub: 'موقع تعريفي سريع متوافق مع كافة الهواتف مع ربط فوري بأزرار المحادثة في واتساب وإنستغرام (قيمته 25 د.أ فقط)',
      calcBadge: 'حساب فوري بالدينار الأردني',
      calcSummaryTitle: 'ملخص باقتك المخصصة',
      sumWebsiteLabel: 'صنع موقع إلكتروني احترافي',
      sumDiscountLabel: 'خصم باقة الافتتاح الخاصة',
      calcTotalLabel: 'الإجمالي التقريبي',
      calcSubmitBtn: 'احجز باقتك عبر واتساب',
      calcFootnote: 'الإجمالي تقديري — يعتمد السعر النهائي على تفاصيل مشروعك عند التواصل.',
      packagesKicker: 'الباقات',
      packagesTitle: 'اختر الباقة اللي تناسب مرحلتك',
      packagesDesc: 'أسعار واضحة بالدينار الأردني، بلا مصاريف مفاجئة.',
      reviewsKicker: 'قسم النجاح وثقة العملاء',
      reviewsTitle: 'مشاعر حقيقية صُنعت من الصفر',
      ctaBannerTitle: 'جاهز تبني هويتك؟',
      ctaBannerDesc: 'راسلنا الآن على واتساب أو تابعنا على إنستغرام — نرد عليك ونبدأ بفكرتك فوراً.',
      ctaWaBtn: 'تواصل معنا على واتساب',
      backHomeBtn: 'العودة إلى الرئيسية',
      portfolioTopMeta: '@studioadam.co · 15 عملاً',
      portfolioPageKicker: 'معرض الأعمال الكامل',
      portfolioPageTitle: 'إعلانات UGC وتصاميم سوشيال ميديا',
      portfolioPageDesc: 'أعمال إعلانية وبصرية حقيقية مصممة لرفع المبيعات وجذب الانتباه من الثانية الأولى — اضغط على أي عمل للمشاهدة بالحجم الكامل.',
      tabAll: 'الكل (15)',
      tabVideos: 'فيديوهات UGC (7)',
      tabDesigns: 'تصاميم السوشيال (8)',
      subVideosTitle: 'فيديوهات الإعلانات والريلز (UGC)',
      subVideosCount: '7 أعمال · مرّر للمعاينة',
      subDesignsTitle: 'تصاميم السوشيال ميديا والهوية البصرية',
      subDesignsCount: '8 تصاميم · اضغط للتكبير',
      portfolioBottomTitle: 'عجبك الأسلوب؟ لنصنع حملتك القادمة',
      portfolioBottomDesc: 'احجز بوستات سوشيال ميديا بـ 1 د.أ للتصميم أو ريلز UGC بـ 3 د.أ للفيديو، أو احسب باقتك المخصصة فوراً.',
      portfolioBookBtn: 'اطلب عملاً الآن',
      portfolioCalcBtn: 'احسب باقتك',
      footerSlogan: 'أنا اللي بصنع من الفكرة أثرًا.',
      footerIdentity: 'الهوية البصرية',
      footerStories: 'قصص النجاح',
      footerCopyright: '© 2026 ستوديو آدم. جميع الحقوق محفوظة — علامة إبداعية تحوّل الأفكار إلى أثر.',
      footerLocation: 'عمّان، الأردن',
      floatingWaLabel: 'تواصل معنا',
      lbRequestBtn: 'اطلب عملاً مشابهاً الآن',
      inqTitle: 'احجز مكانك في ستوديو آدم',
      inqSub: 'أرسل لنا بيانات محلك وسنتواصل معك فوراً لتجهيز انطلاقتك على السوشيال ميديا.',
      inqShopLabel: 'اسم محلك أو مشروعك:',
      inqHandleLabel: 'حساب الإنستغرام (إن وجد):',
      inqServiceLabel: 'الباقة أو الخدمة المطلوبة:',
      inqNotesLabel: 'ملاحظات إضافية عن مجالك:',
      inqSubmitBtn: 'إرسال ومتابعة عبر واتساب مباشرة',
      inqSuccessTitle: 'تم تجهيز بيانات طلبك بنجاح!',
      inqSuccessDesc: 'جاري تحويلك إلى محادثة واتساب ستوديو آدم لمتابعة التفاصيل فوراً.',
      inqWaDirect: 'فتح المحادثة على واتساب الآن',
      shopPlaceholder: 'مثال: متجر ريماس، مقهى أروما',
      notesPlaceholder: 'أخبرنا عن فكرة محلك وموعد الإطلاق المفضل...',
    },
    en: {
      brandSub: 'Studio Adam · Branding & Design',
      navPortfolio: 'Portfolio',
      navLaunch: 'Launch Offer',
      navPackages: 'Packages',
      navCalculator: 'Calculator',
      navServices: 'Services',
      navReviews: 'Reviews',
      bookNow: 'Book Now',
      chipFastTitle: 'Fast Delivery',
      chipFastSub: '2-4 business days',
      chipCalcTitle: 'Instant Estimate',
      chipCalcSub: 'In Jordanian Dinar (JOD)',
      heroBadge: 'Instant Pricing in JOD',
      heroTitleHtml: 'Your Visual Identity Starts <span class="accent-mint">Here</span>',
      heroSubtitle: 'Logos, brand identity, social posts & reels, and websites — design that transforms your idea into a memorable brand.',
      heroCtaExplore: 'Explore Packages',
      heroCtaCalc: 'Calculate Custom',
      launchBadge: 'Launch Offer',
      launchTitle: 'Launch Package',
      launchSub: 'Everything your business needs to launch with authority on social media',
      launchFeat1: 'Professional Logo & Complete Color System',
      launchFeat2: '10 Ready-to-Publish Promotional Posts',
      launchFeat3: 'Custom Pro Website (Included Free in Launch Offer)',
      launchPrice: '25 JOD',
      onlyLabel: 'only',
      launchNote: 'Special rate for the first 5 clients — Limited quantity',
      launchBtn: 'Message Us Directly to Reserve',
      previewKicker: 'Portfolio · Real Reels & Designs',
      previewTitle: 'See Our Work in Action',
      previewDesc: 'Here is a quick glimpse of our latest UGC commercials. Open the dedicated Portfolio page to explore all 7 ad reels and 8 social media designs.',
      metaReelsCount: '7 UGC Reels',
      metaDesignsCount: '8 Social Designs',
      viewPortfolioBtn: 'View Portfolio (15 Works)',
      identityKicker: 'Visual & Color Identity',
      identityTitle: 'Color & System: Pure Architectural Design Philosophy',
      identityDesc: 'Studio Adam’s identity is anchored by two complementary colors: Deep Petrol Teal (#124E52) and Warm Ivory (#F5F0E6), creating an authoritative, timeless presence.',
      swatchPrimaryRole: 'Primary Brand Color',
      swatchPrimaryDesc: 'Symbolizes professionalism, depth, and trust, establishing an authoritative architectural visual signature.',
      swatchBgRole: 'Primary Canvas Color',
      swatchBgDesc: 'Primary foundation for backgrounds and open space. Delivers quiet poise and frames typography with effortless clarity.',
      swatchAppCore: 'Application: Core Pillar',
      studioSlogan: 'From Idea to Impact.',
      deliverablesSub: 'End-to-end deliverables designed for instant market authority',
      servicesKicker: 'Our Services',
      servicesTitle: 'Identity, Content, and Web — Under One Roof',
      servicesDesc: 'Everything your local business needs to establish an authoritative digital presence.',
      calcKicker: 'Instant Calculator in JOD',
      calcTitle: 'Build Your Custom Package',
      calcDesc: 'Choose what you need and watch the total update in real-time.',
      calcStep1Title: 'Logo & Brand Identity',
      calcStep1Sub: 'The foundation — select your brand identity tier',
      calcFixed: 'fixed',
      logoOptNone: 'I Have a Logo',
      logoOptNoneSub: 'No logo design',
      logoOptPro: 'Pro Logo + Palette',
      logoOptProSub: 'Original approved logo',
      logoOptFull: 'Full Identity Guide',
      logoOptFullSub: 'Typography & applications',
      jodShort: 'JOD',
      calcStep2Title: 'Number of Ad Posts',
      calcStep2Sub: 'Scroll-stopping graphics for your Instagram feed (1 JOD / post)',
      calcStep3Title: 'Number of Reels & Motion',
      calcStep3Sub: 'Engaging short-form video reels with modern pacing (3 JOD / reel)',
      presetsLabel: 'Presets:',
      calcStep4Title: 'Professional Custom Website',
      calcStep4Sub: 'Fast responsive landing page with instant WhatsApp & Instagram chat integration (Valued at only 25 JOD)',
      calcBadge: 'Instant Estimate in JOD',
      calcSummaryTitle: 'Custom Package Summary',
      sumWebsiteLabel: 'Custom Website',
      sumDiscountLabel: 'Opening Bundle Discount',
      calcTotalLabel: 'Approximate Total',
      calcSubmitBtn: 'Reserve Your Package via WhatsApp',
      calcFootnote: 'Estimate only — final price confirmed upon reviewing your specific requirements.',
      packagesKicker: 'Packages',
      packagesTitle: 'Choose the Package for Your Stage',
      packagesDesc: 'Clear pricing in Jordanian Dinar (JOD), no hidden costs.',
      reviewsKicker: 'Client Success Stories',
      reviewsTitle: 'Real Businesses We Transformed',
      ctaBannerTitle: 'Ready to Build Your Brand?',
      ctaBannerDesc: 'Message us directly on WhatsApp or follow us on Instagram — we reply promptly to bring your vision to life.',
      ctaWaBtn: 'Chat on WhatsApp',
      backHomeBtn: 'Back to Home',
      portfolioTopMeta: '@studioadam.co · 15 Works',
      portfolioPageKicker: 'Complete Portfolio',
      portfolioPageTitle: 'UGC Ad Reels & Social Media Design',
      portfolioPageDesc: 'Real commercial reels and high-converting social designs crafted to capture attention from frame one — click any work to preview.',
      tabAll: 'All Works (15)',
      tabVideos: 'UGC Ads (7)',
      tabDesigns: 'Social Designs (8)',
      subVideosTitle: 'UGC Commercial Reels',
      subVideosCount: '7 reels · Hover to preview',
      subDesignsTitle: 'Social Media & Brand Designs',
      subDesignsCount: '8 works · Click to inspect',
      portfolioBottomTitle: 'Like What You See? Let’s Build Yours',
      portfolioBottomDesc: 'Book scroll-stopping social posts from 1 JOD, UGC reels from 3 JOD, or calculate your custom bundle.',
      portfolioBookBtn: 'Request Work Now',
      portfolioCalcBtn: 'Package Calculator',
      footerSlogan: 'From Idea to Impact.',
      footerIdentity: 'Brand Identity',
      footerStories: 'Success Stories',
      footerCopyright: '© 2026 STUDIO ADAM. All Rights Reserved — From Idea to Impact.',
      footerLocation: 'Amman, Jordan',
      floatingWaLabel: 'Contact Us',
      lbRequestBtn: 'Request Similar Work',
      inqTitle: 'Book Your Spot at Studio Adam',
      inqSub: 'Submit your business details for prompt direct onboarding.',
      inqShopLabel: 'Shop / Business Name:',
      inqHandleLabel: 'Current Instagram Handle:',
      inqServiceLabel: 'Requested Service / Package:',
      inqNotesLabel: 'Additional Notes / Vision:',
      inqSubmitBtn: 'Proceed via WhatsApp',
      inqSuccessTitle: 'Your Brief is Ready!',
      inqSuccessDesc: 'Redirecting to Studio Adam WhatsApp...',
      inqWaDirect: 'Open WhatsApp Now',
      shopPlaceholder: 'e.g. Remas Store',
      notesPlaceholder: 'Tell us about your products or goals...',
    },
  };

  /* ------------------------------------------------------------------------
     Dynamic Content Arrays (Deliverables, Pillars, Services, Packages, Reviews)
     ------------------------------------------------------------------------ */
  const DELIVERABLES = [
    {
      titleAr: 'الشعار الأصلي وملفات المتجه',
      titleEn: 'Original Logo & Vector Files',
      descAr: 'SVG, PNG, PDF بدقة فائقة لكافة المنصات',
      descEn: 'SVG, PNG, PDF ready for every touchpoint',
      metaAr: 'مشمول',
      metaEn: 'Included',
    },
    {
      titleAr: 'دليل الهوية البصرية الشامل',
      titleEn: 'Brand Identity Guidelines',
      descAr: 'تنسيق الخطوط، الألوان، وقواعد الاستخدام',
      descEn: 'Typography, colors, and design standards',
      metaAr: 'مشمول',
      metaEn: 'Included',
    },
    {
      titleAr: 'بوستات إعلانية توقف التمرير',
      titleEn: 'Scroll-Stopping Ad Posts',
      descAr: 'تصاميم مخصصة للهواتف والإنستغرام',
      descEn: 'Engineered for high CTR on Instagram',
      metaAr: '1 د.أ / بوست',
      metaEn: '1 JOD / post',
    },
    {
      titleAr: 'ريلز وموشن جرافيك عصري',
      titleEn: 'Modern Motion & Reels',
      descAr: 'فيديوهات قصيرة جذابة ومونتاج حديث',
      descEn: 'Engaging short-form video storytelling',
      metaAr: '3 د.أ / فيديو',
      metaEn: '3 JOD / reel',
    },
    {
      titleAr: 'موقع إلكتروني احترافي سريع',
      titleEn: 'Custom Pro Landing Page',
      descAr: 'ربط فوري بالواتساب وإنستغرام للهواتف',
      descEn: 'Instant WhatsApp & Instagram inquiry flow',
      metaAr: '25 د.أ فقط',
      metaEn: '25 JOD only',
    },
  ];

  const PILLARS = [
    { titleAr: 'البساطة الحديثة', titleEn: 'Modern Simplicity', descAr: 'تصاميم نقية تتخلص من الفوضى والتعقيد الزائد وتركّز على جوهر الفكرة وقوتها.', descEn: 'Pure designs cutting through visual noise to magnify the core idea.' },
    { titleAr: 'التوازن البصري', titleEn: 'Visual Balance', descAr: 'تناسق محكم بين الكتل والأوزان لراحة العين وثبات الصورة الذهنية لدى العملاء.', descEn: 'Harmonious weight distribution engineered for immediate recall.' },
    { titleAr: 'التكوينات الهندسية', titleEn: 'Geometric Precision', descAr: 'بناء بصري قائم على الهندسة الدقيقة والخطوط الصريحة والنسب المتناسقة.', descEn: 'Structured grids, calculated geometry, and authoritative typography.' },
    { titleAr: 'قوة المساحات الفارغة', titleEn: 'Negative Space Mastery', descAr: 'توظيف المساحة السلبية بذكاء لتتنفس العناصر ولإبراز الرسالة الأساسية.', descEn: 'Intelligent negative space giving every graphic component authority.' },
  ];

  const SERVICES = [
    {
      titleAr: 'تصميم الشعارات',
      titleEn: 'Logo Design',
      descAr: 'شعار أصلي معتمد بنماذج متعددة واستخدامات أفقية وعامودية تناسب كافة الاستخدامات.',
      descEn: 'Original, approved logo marks with versatile horizontal and vertical lockups.',
    },
    {
      titleAr: 'الهوية البصرية',
      titleEn: 'Visual Identity',
      descAr: 'بناء هوية بصرية متناسقة الألوان والخطوط تمنح مشروعك حضوراً ثابتاً ومهيباً في السوق.',
      descEn: 'Cohesive color systems, typography, and graphic assets giving your business an authoritative presence.',
    },
    {
      titleAr: 'بوستات وريلز السوشيال',
      titleEn: 'Social Posts & Reels',
      descAr: 'تصاميم ومونتاج احترافي يوقف التمرير ويضاعف تفاعل صفحتك على إنستغرام.',
      descEn: 'Scroll-stopping graphic designs and high-impact reels crafted for viral reach and engagement.',
    },
    {
      titleAr: 'مواقع إلكترونية احترافية',
      titleEn: 'Custom Websites',
      descAr: 'مواقع سريعة متوافقة مع الهواتف تحوّل الزوار إلى اتصالات وطلبات مباشرة عبر واتساب.',
      descEn: 'Ultra-fast responsive websites engineered to turn visitors into direct inquiries via WhatsApp.',
      tagAr: 'عرض خاص: 25 د.أ',
      tagEn: 'Special Deal: 25 JOD',
    },
  ];

  const PACKAGES = [
    {
      nameAr: 'باقة انطلاقة (عرض الافتتاح)',
      nameEn: 'Launch Package (Opening Special)',
      subAr: 'كل اللي يحتاجه محلك عشان يبدأ على السوشيال ميديا بقوة.',
      subEn: 'Everything your shop needs to kickstart social media presence.',
      timelineAr: 'من 2 إلى 4 أيام عمل',
      timelineEn: '2 - 4 Business Days',
      price: 25,
      popular: true,
      featuresAr: [
        'لوجو احترافي مع هوية لونية متناسقة',
        '10 بوستات إعلانية لصفحتك توقف التمرير',
        'موقع إلكتروني احترافي (مشمول مجاناً)',
        'سعر خاص لأول 5 عملاء (25 دينار فقط)',
      ],
      featuresEn: [
        'Professional logo + cohesive color identity',
        '10 scroll-stopping ad posts for your profile',
        'Pro custom website (included free)',
        'Special rate for first 5 clients (Only 25 JOD)',
      ],
    },
    {
      nameAr: 'باقة الهوية المتكاملة',
      nameEn: 'Complete Identity Package',
      subAr: 'بناء هوية بصرية كاملة تنقل علامتك التجارية لمستوى احترافي أعلى.',
      subEn: 'Complete visual identity system taking your brand to the top tier.',
      timelineAr: 'من 4 إلى 6 أيام عمل',
      timelineEn: '4 - 6 Business Days',
      price: 45,
      popular: false,
      featuresAr: [
        'شعار كامل بنماذج أفقية وعمودية',
        'دليل هوية بصرية شامل (Brand Guidelines)',
        '15 بوست إعلاني + 3 قوالب ستوري',
        'موقع تعريفي سريع مع ربط الواتساب',
      ],
      featuresEn: [
        'Full logo suite with horizontal & vertical lockups',
        'Comprehensive Brand Guidelines PDF',
        '15 ad posts + 3 editable story templates',
        'Fast responsive website with WhatsApp connect',
      ],
    },
    {
      nameAr: 'باقة الحضور الرقمي الشامل',
      nameEn: 'Full Digital Presence',
      subAr: 'انطلاقة قوية تجمع بين الهوية والمحتوى والموقع وتصاميم الإعلانات.',
      subEn: 'Robust multi-channel presence unifying brand, content, and website.',
      timelineAr: 'من 5 إلى 7 أيام عمل',
      timelineEn: '5 - 7 Business Days',
      price: 65,
      popular: false,
      featuresAr: [
        'هوية بصرية متكاملة وشعار استثنائي',
        '20 بوست إعلاني وكاروسيل تسويقي',
        'موقع إلكتروني متكامل للمنتجات أو الخدمات',
        'فيديوهان ريلز ترويجيان + موشن جرافيكس',
      ],
      featuresEn: [
        'Comprehensive brand identity & custom logo',
        '20 high-converting ad posts & carousels',
        'Complete showcase website',
        '2 promotional Reels with motion graphics',
      ],
    },
  ];

  const REVIEWS = [
    {
      textAr: '«الهوية اللي صمموها لنا غيّرت شكل محلك بالكامل — العملاء صاروا يسألون عن مصممنا.»',
      textEn: '"The brand identity they crafted transformed our store completely — customers constantly ask who designed our branding."',
      clientAr: 'محل عطور',
      clientEn: 'Perfume Boutique',
      initialAr: 'ع',
      initialEn: 'P',
    },
    {
      textAr: '«البوستات والريلز ضاعفت تفاعل صفحتنا، والتسليم كان أسرع من المتوقع وبجودة خيالية.»',
      textEn: '"The ad posts and reels multiplied our page engagement, and turnaround was lightning-fast."',
      clientAr: 'كافيه وكوفي شوب',
      clientEn: 'Specialty Cafe',
      initialAr: 'ك',
      initialEn: 'C',
    },
    {
      textAr: '«الموقع السريع مربوط بالواتساب جاب لنا طلبات وحجوزات مباشرة من أول أسبوع.»',
      textEn: '"The fast responsive landing page with WhatsApp chat brought us direct customer orders in the first week."',
      clientAr: 'متجر حلويات ومعجنات',
      clientEn: 'Artisan Bakery',
      initialAr: 'ح',
      initialEn: 'B',
    },
  ];

  /* ------------------------------------------------------------------------
     App State
     ------------------------------------------------------------------------ */
  const state = {
    lang: 'ar',
    page: window.location.hash === '#portfolio-page' ? 'portfolio' : 'home',
    filter: 'all',
    lightboxItemId: null,
    calc: {
      logo: 'none',
      posts: 10,
      videos: 2,
      website: true,
    },
  };

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function getVisiblePortfolioList() {
    if (state.filter === 'videos') return PORTFOLIO_VIDEOS;
    if (state.filter === 'designs') return PORTFOLIO_DESIGNS;
    return [...PORTFOLIO_VIDEOS, ...PORTFOLIO_DESIGNS];
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ------------------------------------------------------------------------
     Navigation & Page Switching (Home <-> Dedicated Portfolio Page)
     ------------------------------------------------------------------------ */
  function navigate(page, hash) {
    const homeView = $('#home-view');
    const portfolioView = $('#portfolio-view');
    const drawer = $('#mobile-drawer');
    if (drawer) drawer.classList.add('hidden');

    state.page = page;

    if (page === 'portfolio') {
      homeView.classList.add('hidden');
      portfolioView.classList.remove('hidden');
      if (window.location.hash !== '#portfolio-page') {
        history.pushState({ page: 'portfolio' }, '', '#portfolio-page');
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      portfolioView.classList.add('hidden');
      homeView.classList.remove('hidden');
      const targetUrl = hash || '#home';
      history.pushState({ page: 'home' }, '', targetUrl);

      if (hash && hash !== '#home') {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    updateNavActiveStates();
  }

  function updateNavActiveStates() {
    $$('[data-nav-page="portfolio"]').forEach((el) => {
      el.classList.toggle('is-active', state.page === 'portfolio');
    });
  }

  /* ------------------------------------------------------------------------
     Video Card Factory (Shared between Home 2-Video Preview & Full Gallery)
     ------------------------------------------------------------------------ */
  function createVideoCard(item, isPreviewMode) {
    const isAr = state.lang === 'ar';
    const card = document.createElement('div');
    card.className = 'media-card aspect-9-16 card-hover';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const title = isAr ? item.titleAr : item.titleEn;
    const client = isAr ? item.clientAr : item.clientEn;
    const cat = isAr ? item.categoryAr : item.categoryEn;

    card.innerHTML = `
      <video src="${item.src}#t=0.8" muted loop playsinline preload="metadata"></video>
      <div class="card-controls-top">
        <button type="button" class="icon-circle-dark js-mute-btn" aria-label="${isAr ? 'كتم أو تشغيل الصوت' : 'Toggle Mute'}">
          <span class="js-mute-icon">🔇</span>
        </button>
        ${
          isPreviewMode
            ? `<button type="button" class="mini-pill-link js-open-all">${isAr ? 'عرض الكل ↗' : 'View All ↗'}</button>`
            : `<span class="icon-circle-dark" aria-hidden="true">⤢</span>`
        }
      </div>
      <div class="play-overlay" aria-hidden="true">
        <div class="play-btn-circle">▶</div>
      </div>
      <div class="card-scrim">
        <div class="card-meta-line">
          <span>${escapeHtml(client)}</span>
          <span aria-hidden="true">·</span>
          <span>${escapeHtml(cat)}</span>
        </div>
        <h4 class="card-title-overlay">${escapeHtml(title)}</h4>
      </div>
    `;

    const video = card.querySelector('video');
    const muteBtn = card.querySelector('.js-mute-btn');
    const muteIcon = card.querySelector('.js-mute-icon');
    const openAllBtn = card.querySelector('.js-open-all');

    card.addEventListener('mouseenter', () => {
      video.play().then(() => card.classList.add('is-playing')).catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      card.classList.remove('is-playing');
    });

    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      muteIcon.textContent = video.muted ? '🔇' : '🔊';
      if (video.paused) {
        video.play().then(() => card.classList.add('is-playing')).catch(() => {});
      }
    });

    if (openAllBtn) {
      openAllBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate('portfolio');
      });
    }

    card.addEventListener('click', () => {
      if (isPreviewMode) {
        if (video.paused) {
          video.play().then(() => card.classList.add('is-playing')).catch(() => {});
        } else {
          video.pause();
          card.classList.remove('is-playing');
        }
      } else {
        openLightbox(item.id);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isPreviewMode) navigate('portfolio');
        else openLightbox(item.id);
      }
    });

    return card;
  }

  function createDesignCard(item) {
    const isAr = state.lang === 'ar';
    const card = document.createElement('div');
    card.className = 'media-card aspect-4-5 card-hover';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const title = isAr ? item.titleAr : item.titleEn;
    const client = isAr ? item.clientAr : item.clientEn;
    const cat = isAr ? item.categoryAr : item.categoryEn;

    card.innerHTML = `
      <img src="${item.src}" alt="${escapeHtml(title)}" loading="lazy" class="${item.aspect === '1/1' ? 'is-square-logo' : ''}" />
      <div class="card-scrim">
        <div class="card-meta-line">
          <span>${escapeHtml(client)}</span>
          <span aria-hidden="true">·</span>
          <span>${escapeHtml(cat)}</span>
        </div>
        <h4 class="card-title-overlay">${escapeHtml(title)}</h4>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(item.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item.id);
      }
    });

    return card;
  }

  /* ------------------------------------------------------------------------
     Render Sections
     ------------------------------------------------------------------------ */
  function renderPreviewVideos() {
    const container = $('#preview-videos-container');
    if (!container) return;
    container.innerHTML = '';
    PORTFOLIO_VIDEOS.slice(0, 2).forEach((item) => {
      container.appendChild(createVideoCard(item, true));
    });
  }

  function renderPortfolioPage() {
    const isAr = state.lang === 'ar';
    const videosBlock = $('#portfolio-videos-block');
    const designsBlock = $('#portfolio-designs-block');
    const videosGrid = $('#portfolio-videos-grid');
    const designsGrid = $('#portfolio-designs-grid');

    const showVideos = state.filter === 'all' || state.filter === 'videos';
    const showDesigns = state.filter === 'all' || state.filter === 'designs';

    videosBlock.classList.toggle('hidden', !showVideos);
    designsBlock.classList.toggle('hidden', !showDesigns);

    videosGrid.innerHTML = '';
    PORTFOLIO_VIDEOS.forEach((v) => videosGrid.appendChild(createVideoCard(v, false)));

    // 8th Symmetrical Commission Card
    const ctaCard = document.createElement('div');
    ctaCard.className = 'commission-card dots-dark card-hover-dark';
    ctaCard.setAttribute('role', 'button');
    ctaCard.setAttribute('tabindex', '0');
    ctaCard.innerHTML = `
      <div style="position:relative;z-index:1;">
        <span style="font-size:0.75rem;font-weight:800;color:var(--mint);display:block;">
          ${isAr ? 'إنتاج مخصص · 3 د.أ / فيديو' : 'Custom Production · 3 JOD / reel'}
        </span>
        <h4>${isAr ? 'إعلان مشروعك القادم يبدأ هنا' : 'Your Brand Reel Starts Here'}</h4>
        <p style="font-size:0.82rem;color:rgba(255,255,255,0.82);font-weight:600;margin:0;">
          ${isAr ? 'فيديوهات UGC وموشن عالية التحويل تبرز منتجك خلال أيام.' : 'High-converting UGC product reels delivered within days.'}
        </p>
      </div>
      <div style="position:relative;z-index:1;">
        <div class="font-mono" style="font-size:0.75rem;opacity:0.75;border-top:1px solid rgba(255,255,255,0.16);padding-top:0.75rem;margin-bottom:0.75rem;">
          @studioadam.co
        </div>
        <div class="btn-white" style="width:100%;font-size:0.82rem;padding:0.7rem 1rem;">
          ${isAr ? 'اطلب إعلانك الآن ↗' : 'Book Your Ad Reel ↗'}
        </div>
      </div>
    `;
    ctaCard.addEventListener('click', () => {
      openInquiryModal(isAr ? 'إنتاج فيديو إعلاني UGC مخصص' : 'Custom UGC Commercial Video');
    });
    videosGrid.appendChild(ctaCard);

    designsGrid.innerHTML = '';
    PORTFOLIO_DESIGNS.forEach((d) => designsGrid.appendChild(createDesignCard(d)));

    $$('[data-filter-tab]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-filter-tab') === state.filter);
    });
  }

  function renderHomeLists() {
    const isAr = state.lang === 'ar';

    // Deliverables
    const delivContainer = $('#deliverables-container');
    delivContainer.innerHTML = DELIVERABLES.map(
      (d) => `
      <div class="deliverable-row">
        <div>
          <div style="font-weight:900;font-size:0.9rem;color:var(--teal-ink);">${escapeHtml(isAr ? d.titleAr : d.titleEn)}</div>
          <div style="font-size:0.78rem;color:var(--ink-soft);font-weight:600;">${escapeHtml(isAr ? d.descAr : d.descEn)}</div>
        </div>
        <span style="font-size:0.75rem;font-weight:900;color:var(--teal);white-space:nowrap;">${escapeHtml(isAr ? d.metaAr : d.metaEn)}</span>
      </div>
    `
    ).join('');

    // Pillars
    const pillarsContainer = $('#pillars-container');
    pillarsContainer.innerHTML = PILLARS.map(
      (p) => `
      <div class="pillar-card card-hover">
        <div>
          <div class="icon-square">✦</div>
          <h4 style="margin:0 0 0.4rem;font-size:0.92rem;font-weight:900;color:#124E52;">${escapeHtml(isAr ? p.titleAr : p.titleEn)}</h4>
          <p style="margin:0;font-size:0.78rem;color:var(--ink-soft);font-weight:600;">${escapeHtml(isAr ? p.descAr : p.descEn)}</p>
        </div>
      </div>
    `
    ).join('');

    // Services
    const srvContainer = $('#services-container');
    srvContainer.innerHTML = SERVICES.map((s) => {
      const title = isAr ? s.titleAr : s.titleEn;
      const tag = isAr ? s.tagAr : s.tagEn;
      return `
        <div class="surface-card card-hover">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.1rem;">
              <div class="icon-square" style="margin-bottom:0;">◆</div>
              ${tag ? `<span class="section-kicker-pill" style="margin-bottom:0;">${escapeHtml(tag)}</span>` : ''}
            </div>
            <h3 style="margin:0 0 0.5rem;font-size:1.25rem;font-weight:900;color:var(--teal-ink);">${escapeHtml(title)}</h3>
            <p style="margin:0 0 1.4rem;font-size:0.86rem;color:var(--ink-soft);font-weight:600;">${escapeHtml(isAr ? s.descAr : s.descEn)}</p>
          </div>
          <div style="padding-top:1rem;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
            <button type="button" class="js-srv-btn" data-pkg="${escapeHtml(title)}" style="background:none;border:none;color:var(--teal);font-weight:900;font-size:0.85rem;cursor:pointer;padding:0;">
              ${isAr ? 'اطلب الخدمة الآن ↗' : 'Request Service ↗'}
            </button>
            <span class="font-mono" style="font-size:0.72rem;font-weight:700;color:var(--ink-soft);">STUDIO ADAM</span>
          </div>
        </div>
      `;
    }).join('');

    $$('.js-srv-btn').forEach((btn) => {
      btn.addEventListener('click', () => openInquiryModal(btn.getAttribute('data-pkg')));
    });

    // Packages
    const pkgContainer = $('#packages-container');
    pkgContainer.innerHTML = PACKAGES.map((pkg) => {
      const name = isAr ? pkg.nameAr : pkg.nameEn;
      const sub = isAr ? pkg.subAr : pkg.subEn;
      const timeline = isAr ? pkg.timelineAr : pkg.timelineEn;
      const feats = isAr ? pkg.featuresAr : pkg.featuresEn;
      const priceLabel = isAr ? `${pkg.price} دينار` : `${pkg.price} JOD`;

      return `
        <div class="package-card ${pkg.popular ? 'is-featured dots-dark card-hover-dark' : 'card-hover'}">
          ${pkg.popular ? `<span class="floating-deal-tag">${isAr ? 'العرض الأكثر طلباً' : 'Most Popular Deal'}</span>` : ''}
          <div>
            <h3 style="margin:0 0 0.4rem;font-size:1.35rem;font-weight:900;">${escapeHtml(name)}</h3>
            <p style="margin:0 0 1rem;font-size:0.84rem;font-weight:600;opacity:0.82;">${escapeHtml(sub)}</p>
            <div style="margin-bottom:1rem;">
              <span style="display:inline-block;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.75rem;font-weight:800;${pkg.popular ? 'background:rgba(255,255,255,0.15);color:#fff;' : 'background:var(--teal-soft);color:var(--teal);'}">
                ⏱ ${escapeHtml(timeline)}
              </span>
            </div>
            <div class="tabular-nums" style="font-size:2.1rem;font-weight:900;margin-bottom:0.2rem;">${escapeHtml(priceLabel)}</div>
            <div style="font-size:0.75rem;font-weight:700;opacity:0.72;margin-bottom:1.25rem;">
              ${isAr ? 'تكلفة شاملة لكامل المخرجات' : 'All-inclusive project price'}
            </div>
            <ul class="check-list" style="${pkg.popular ? '' : 'border-color:var(--line);'}">
              ${feats
                .map(
                  (f) => `
                <li>
                  <span style="color:${pkg.popular ? 'var(--mint)' : 'var(--teal)'};font-weight:900;">✓</span>
                  <span>${escapeHtml(f)}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
          <button type="button" class="${pkg.popular ? 'btn-white' : 'btn-teal'} js-pkg-btn" data-pkg="${escapeHtml(name)}" style="width:100%;">
            ${isAr ? 'اختر هذه الباقة' : 'Select This Package'}
          </button>
        </div>
      `;
    }).join('');

    $$('.js-pkg-btn').forEach((btn) => {
      btn.addEventListener('click', () => openInquiryModal(btn.getAttribute('data-pkg')));
    });

    // Reviews
    const revContainer = $('#reviews-container');
    revContainer.innerHTML = REVIEWS.map(
      (r) => `
      <div class="surface-card card-hover">
        <div>
          <div style="color:#f59e0b;letter-spacing:0.15em;margin-bottom:0.75rem;">★★★★★</div>
          <p style="margin:0 0 1.5rem;font-size:0.95rem;font-weight:700;color:var(--ink);">${escapeHtml(isAr ? r.textAr : r.textEn)}</p>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;padding-top:1rem;border-top:1px solid var(--line);">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;">
            ${escapeHtml(isAr ? r.initialAr : r.initialEn)}
          </div>
          <div>
            <strong style="display:block;font-size:0.88rem;color:var(--teal-ink);">${escapeHtml(isAr ? r.clientAr : r.clientEn)}</strong>
            <small style="font-size:0.75rem;font-weight:700;color:var(--ink-soft);">${isAr ? 'عميل ستوديو آدم' : 'Studio Adam Client'}</small>
          </div>
        </div>
      </div>
    `
    ).join('');
  }

  /* ------------------------------------------------------------------------
     Interactive JOD Package Calculator
     ------------------------------------------------------------------------ */
  function updateCalculatorUI() {
    const isAr = state.lang === 'ar';
    const unit = isAr ? 'د.أ' : 'JOD';
    const logoPrices = { none: 0, logo: 10, full: 20 };

    const logoCost = logoPrices[state.calc.logo];
    const postsCost = state.calc.posts * 1;
    const videosCost = state.calc.videos * 3;
    const websiteCost = state.calc.website ? 25 : 0;

    const hasDiscount = state.calc.logo !== 'none' && state.calc.posts >= 10 && state.calc.website;
    const discount = hasDiscount ? 20 : 0;
    const total = Math.max(25, logoCost + postsCost + videosCost + websiteCost - discount);

    $('#calc-logo-display').textContent = `+${logoCost} ${unit}`;
    $('#calc-posts-display').textContent = `${state.calc.posts} ${isAr ? 'بوست' : 'Posts'}`;
    $('#calc-posts-cost').textContent = `(${postsCost} ${unit})`;
    $('#calc-videos-display').textContent = `${state.calc.videos} ${isAr ? 'ريلز' : 'Reels'}`;
    $('#calc-videos-cost').textContent = `(${videosCost} ${unit})`;

    const postsRange = $('#posts-range');
    const videosRange = $('#videos-range');
    postsRange.value = String(state.calc.posts);
    videosRange.value = String(state.calc.videos);

    const dir = isAr ? 'left' : 'right';
    postsRange.style.background = `linear-gradient(to ${dir}, #0d4f49 ${(state.calc.posts / 25) * 100}%, #e4dfcf ${(state.calc.posts / 25) * 100}%)`;
    videosRange.style.background = `linear-gradient(to ${dir}, #0d4f49 ${(state.calc.videos / 8) * 100}%, #e4dfcf ${(state.calc.videos / 8) * 100}%)`;

    const webBtn = $('#website-toggle-btn');
    webBtn.classList.toggle('is-on', state.calc.website);
    $('#calc-website-badge').textContent = state.calc.website
      ? isAr ? 'مشمول (25 د.أ)' : 'Included (25 JOD)'
      : isAr ? 'غير مشمول (0 د.أ)' : 'Excluded (0 JOD)';

    $$('[data-logo-opt]').forEach((b) => b.classList.toggle('is-selected', b.getAttribute('data-logo-opt') === state.calc.logo));
    $$('[data-posts-preset]').forEach((b) => b.classList.toggle('is-active', Number(b.getAttribute('data-posts-preset')) === state.calc.posts));
    $$('[data-videos-preset]').forEach((b) => b.classList.toggle('is-active', Number(b.getAttribute('data-videos-preset')) === state.calc.videos));

    const logoNames = {
      none: isAr ? 'لدي شعار جاهز' : 'I Have a Logo',
      logo: isAr ? 'لوجو احترافي + ألوان' : 'Pro Logo + Colors',
      full: isAr ? 'هوية بصرية شاملة' : 'Full Brand Identity',
    };

    $('#sum-logo-label').textContent = logoNames[state.calc.logo];
    $('#sum-logo-cost').textContent = `${logoCost} ${unit}`;
    $('#sum-posts-label').textContent = `${state.calc.posts} ${isAr ? 'بوستات إعلانية' : 'Ad Posts'}`;
    $('#sum-posts-cost').textContent = `${postsCost} ${unit}`;
    $('#sum-videos-label').textContent = `${state.calc.videos} ${isAr ? 'فيديوهات ريلز وموشن' : 'Reels Videos'}`;
    $('#sum-videos-cost').textContent = `${videosCost} ${unit}`;
    $('#sum-website-cost').textContent = `${websiteCost} ${unit}`;

    const discountRow = $('#sum-discount-row');
    discountRow.classList.toggle('hidden', discount === 0);
    $('#sum-discount-cost').textContent = `-${discount} ${unit}`;
    $('#sum-total-display').textContent = `${total} ${unit}`;
  }

  /* ------------------------------------------------------------------------
     Cinema Lightbox Modal
     ------------------------------------------------------------------------ */
  function openLightbox(itemId) {
    state.lightboxItemId = itemId;
    renderLightbox();
    $('#lightbox-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    state.lightboxItemId = null;
    $('#lightbox-media-slot').innerHTML = '';
    $('#lightbox-modal').classList.add('hidden');
    document.body.style.overflow = '';
  }

  function stepLightbox(delta) {
    const list = getVisiblePortfolioList();
    const idx = list.findIndex((x) => x.id === state.lightboxItemId);
    if (idx === -1 || !list.length) return;
    const nextIdx = (idx + delta + list.length) % list.length;
    state.lightboxItemId = list[nextIdx].id;
    renderLightbox();
  }

  function renderLightbox() {
    const isAr = state.lang === 'ar';
    const all = [...PORTFOLIO_VIDEOS, ...PORTFOLIO_DESIGNS];
    const item = all.find((x) => x.id === state.lightboxItemId);
    if (!item) return;

    const slot = $('#lightbox-media-slot');
    if (item.kind === 'video') {
      slot.innerHTML = `<video src="${item.src}" controls autoplay playsinline loop></video>`;
    } else {
      slot.innerHTML = `<img src="${item.src}" alt="${escapeHtml(isAr ? item.titleAr : item.titleEn)}" />`;
    }

    $('#lb-format').textContent = isAr ? item.formatAr : item.formatEn;
    $('#lb-title').textContent = isAr ? item.titleAr : item.titleEn;
    $('#lb-meta').textContent = `${isAr ? item.clientAr : item.clientEn} · ${isAr ? item.categoryAr : item.categoryEn}`;
    $('#lb-brief').textContent = isAr ? item.briefAr : item.briefEn;
  }

  /* ------------------------------------------------------------------------
     WhatsApp Inquiry Modal
     ------------------------------------------------------------------------ */
  function openInquiryModal(packageText) {
    const isAr = state.lang === 'ar';
    const defaultPkg = isAr ? 'باقة انطلاقة (عرض الافتتاح)' : 'Launch Package (Opening Special)';
    const val = packageText && packageText !== 'launch' ? packageText : defaultPkg;

    $('#inquiry-form-view').classList.remove('hidden');
    $('#inquiry-success-view').classList.add('hidden');

    const select = $('#inq-service');
    const presets = isAr
      ? [
          'باقة انطلاقة (عرض الافتتاح)',
          'باقة الهوية المتكاملة',
          'باقة الحضور الرقمي الشامل',
          'تصميم مواقع إلكترونية احترافية',
          'لوجوهات وهوية بصرية',
          'بوستات إعلانية',
          'فيديوهات قصيرة وموشن',
        ]
      : [
          'Launch Package (Opening Special)',
          'Complete Identity Package',
          'Full Digital Presence',
          'Custom Websites',
          'Logos & Identity Only',
          'Ad Posts Only',
          'Reels & Motion Only',
        ];

    const isPreset = presets.includes(val);
    const shortLabel = val.includes('\n') ? val.split('\n')[0].replace(/[:：]\s*$/, '') : val;

    select.innerHTML = '';
    if (!isPreset && val) {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = shortLabel;
      select.appendChild(opt);
    }
    presets.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      select.appendChild(opt);
    });
    select.value = val;

    const preview = $('#inq-brief-preview');
    if (val.includes('\n')) {
      preview.textContent = val;
      preview.classList.remove('hidden');
    } else {
      preview.classList.add('hidden');
    }

    $('#inquiry-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeInquiryModal() {
    $('#inquiry-modal').classList.add('hidden');
    document.body.style.overflow = '';
  }

  /* ------------------------------------------------------------------------
     Bilingual Sync
     ------------------------------------------------------------------------ */
  function applyLanguage() {
    const isAr = state.lang === 'ar';
    const dict = I18N[state.lang];

    document.documentElement.lang = state.lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    $('#lang-toggle-label').textContent = isAr ? 'EN' : 'عربي';
    $('#hero-title').innerHTML = dict.heroTitleHtml;
    $('#inq-shop').placeholder = dict.shopPlaceholder;
    $('#inq-notes').placeholder = dict.notesPlaceholder;

    $$('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    renderPreviewVideos();
    renderHomeLists();
    renderPortfolioPage();
    updateCalculatorUI();
    updateNavActiveStates();
  }

  /* ------------------------------------------------------------------------
     Event Wiring & Boot
     ------------------------------------------------------------------------ */
  function init() {
    applyLanguage();

    if (state.page === 'portfolio') {
      navigate('portfolio');
    }

    // Navigation buttons & links
    document.addEventListener('click', (e) => {
      const navTarget = e.target.closest('[data-nav-page]');
      if (navTarget) {
        e.preventDefault();
        const page = navTarget.getAttribute('data-nav-page');
        const hash = navTarget.getAttribute('data-nav-hash') || undefined;
        navigate(page, hash);
        return;
      }

      const inqTrigger = e.target.closest('[data-open-inquiry]');
      if (inqTrigger) {
        e.preventDefault();
        openInquiryModal(inqTrigger.getAttribute('data-open-inquiry'));
      }
    });

    window.addEventListener('popstate', () => {
      const next = window.location.hash === '#portfolio-page' ? 'portfolio' : 'home';
      state.page = next;
      $('#home-view').classList.toggle('hidden', next === 'portfolio');
      $('#portfolio-view').classList.toggle('hidden', next !== 'portfolio');
      updateNavActiveStates();
    });

    // Language toggle
    $('#lang-toggle-btn').addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar';
      applyLanguage();
    });

    // Mobile menu
    $('#mobile-menu-toggle').addEventListener('click', () => {
      $('#mobile-drawer').classList.toggle('hidden');
    });

    // Scroll to top
    $('#scroll-top-btn').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Portfolio filter tabs
    $$('[data-filter-tab]').forEach((tab) => {
      tab.addEventListener('click', () => {
        state.filter = tab.getAttribute('data-filter-tab');
        renderPortfolioPage();
      });
    });

    $('#portfolio-book-btn').addEventListener('click', () => {
      openInquiryModal(state.lang === 'ar' ? 'طلب حملة إعلانية وتصاميم' : 'Ad Reels & Social Design Campaign');
    });

    // Calculator bindings
    $$('[data-logo-opt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.calc.logo = btn.getAttribute('data-logo-opt');
        updateCalculatorUI();
      });
    });

    $('#posts-range').addEventListener('input', (e) => {
      state.calc.posts = Number(e.target.value);
      updateCalculatorUI();
    });
    $('#posts-dec').addEventListener('click', () => {
      state.calc.posts = Math.max(0, state.calc.posts - 1);
      updateCalculatorUI();
    });
    $('#posts-inc').addEventListener('click', () => {
      state.calc.posts = Math.min(25, state.calc.posts + 1);
      updateCalculatorUI();
    });
    $$('[data-posts-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.calc.posts = Number(btn.getAttribute('data-posts-preset'));
        updateCalculatorUI();
      });
    });

    $('#videos-range').addEventListener('input', (e) => {
      state.calc.videos = Number(e.target.value);
      updateCalculatorUI();
    });
    $('#videos-dec').addEventListener('click', () => {
      state.calc.videos = Math.max(0, state.calc.videos - 1);
      updateCalculatorUI();
    });
    $('#videos-inc').addEventListener('click', () => {
      state.calc.videos = Math.min(8, state.calc.videos + 1);
      updateCalculatorUI();
    });
    $$('[data-videos-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.calc.videos = Number(btn.getAttribute('data-videos-preset'));
        updateCalculatorUI();
      });
    });

    $('#website-toggle-btn').addEventListener('click', () => {
      state.calc.website = !state.calc.website;
      updateCalculatorUI();
    });

    $('#calc-submit-btn').addEventListener('click', () => {
      const isAr = state.lang === 'ar';
      const logoPrices = { none: 0, logo: 10, full: 20 };
      const logoCost = logoPrices[state.calc.logo];
      const postsCost = state.calc.posts;
      const videosCost = state.calc.videos * 3;
      const webCost = state.calc.website ? 25 : 0;
      const discount = state.calc.logo !== 'none' && state.calc.posts >= 10 && state.calc.website ? 20 : 0;
      const total = Math.max(25, logoCost + postsCost + videosCost + webCost - discount);

      const summary = isAr
        ? `باقة مخصصة بحاسبة ستوديو آدم:\n• الشعار: +${logoCost} د.أ\n• البوستات: ${state.calc.posts} (${postsCost} د.أ)\n• الفيديوهات: ${state.calc.videos} (${videosCost} د.أ)\n• الموقع: ${state.calc.website ? 'نعم (25 د.أ)' : 'لا'}\n• الإجمالي التقديري: ${total} دينار أردني`
        : `Custom Package from Studio Adam Calculator:\n• Logo: +${logoCost} JOD\n• Posts: ${state.calc.posts} (${postsCost} JOD)\n• Videos: ${state.calc.videos} (${videosCost} JOD)\n• Website: ${state.calc.website ? 'Yes (25 JOD)' : 'No'}\n• Estimated Total: ${total} JOD`;

      openInquiryModal(summary);
    });

    // Lightbox events
    $('#lightbox-close').addEventListener('click', closeLightbox);
    $('#lightbox-modal').addEventListener('click', (e) => {
      if (e.target === $('#lightbox-modal')) closeLightbox();
    });
    $('#lightbox-prev').addEventListener('click', () => stepLightbox(state.lang === 'ar' ? 1 : -1));
    $('#lightbox-next').addEventListener('click', () => stepLightbox(state.lang === 'ar' ? -1 : 1));
    $('#lb-request-btn').addEventListener('click', () => {
      const title = $('#lb-title').textContent;
      closeLightbox();
      openInquiryModal(state.lang === 'ar' ? `طلب عمل مشابه: ${title}` : `Similar Work Request: ${title}`);
    });

    // Inquiry modal events
    $('#inquiry-close').addEventListener('click', closeInquiryModal);
    $('#inquiry-modal').addEventListener('click', (e) => {
      if (e.target === $('#inquiry-modal')) closeInquiryModal();
    });

    $('#inq-service').addEventListener('change', (e) => {
      const val = e.target.value;
      const preview = $('#inq-brief-preview');
      if (val.includes('\n')) {
        preview.textContent = val;
        preview.classList.remove('hidden');
      } else {
        preview.classList.add('hidden');
      }
    });

    $('#inquiry-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const isAr = state.lang === 'ar';
      const shop = $('#inq-shop').value.trim();
      const handle = $('#inq-handle').value.trim();
      const service = $('#inq-service').value;
      const notes = $('#inq-notes').value.trim();

      const brief = isAr
        ? `مرحباً ستوديو آدم، أود حجز مكان في باقة تصميم:\n• اسم المحل / المشروع: ${shop || 'مشروع جديد'}\n• حساب الإنستغرام: ${handle || 'قيد الإنشاء'}\n• الخدمة المطلوبة: ${service}\n• تفاصيل إضافية: ${notes || 'لا يوجد'}`
        : `Hello Studio Adam, I'd like to book a design package:\n• Shop / Business: ${shop || 'New Brand'}\n• Instagram Handle: ${handle || 'Under creation'}\n• Selected Package: ${service}\n• Details: ${notes || 'None'}`;

      const waUrl = `${STUDIO_CONFIG.whatsappUrl}?text=${encodeURIComponent(brief)}`;
      $('#inq-wa-direct').href = waUrl;
      $('#inquiry-form-view').classList.add('hidden');
      $('#inquiry-success-view').classList.remove('hidden');
      setTimeout(() => {
        window.location.href = waUrl;
      }, 1100);
    });

    // Global Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (!$('#lightbox-modal').classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') stepLightbox(state.lang === 'ar' ? -1 : 1);
        if (e.key === 'ArrowLeft') stepLightbox(state.lang === 'ar' ? 1 : -1);
      } else if (!$('#inquiry-modal').classList.contains('hidden') && e.key === 'Escape') {
        closeInquiryModal();
      }
    });

    // Cursor Glow (Desktop only)
    const glow = $('#cursor-glow');
    if (glow && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', (e) => {
        glow.style.setProperty('--mouse-x', `${e.clientX}px`);
        glow.style.setProperty('--mouse-y', `${e.clientY}px`);
      }, { passive: true });
    }

    // IntersectionObserver reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    $$('.reveal').forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
