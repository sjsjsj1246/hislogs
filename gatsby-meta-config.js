module.exports = {
  title: `hislogs.com`,
  description: `황인서의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `http://localhost:8000/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `sjsjsj1246/hislogs`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `황인서`,
    nickname: `sjsjsj1246`,
    bio: {
      role: `개발자`,
      description: ['세상에 가치를 더하는', '사회에 선한 영향력을 주는'],
      thumbnail: 'profile.jpeg', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/sjsjsj1246`,
      linkedIn: `https://www.linkedin.com/in/%EC%9D%B8%EC%84%9C-%ED%99%A9-04582720a/`,
      email: `sjsjsj1246@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2018.03 ~',
        activity: '서울 과학기술대학교 컴퓨터공학과',
      },
      {
        date: '2018.03 ~',
        activity: '교내 학술동아리 EndlessCreation',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: 'Hippy',
        date: '21.04.30 ~ 21.05.3',
        description:
          '우리은행 온택트 해커톤에서 개발한 NFT 현금 거래 플랫폼입니다.  리액트를 배운 후 처음으로 협업을 한 프로젝트입니다. 백엔드와의 통신, 리덕스를 통한 전역 상태관리, OAuth, materil-ui, 인증, 디자인 등 처음 하는 협업이다 보니 배울 것이 많았고 그만큼 성장했던 경험이었습니다. ',
        techStack: ['React', 'Redux', 'Material-ui', '장려상'],
        thumbnailUrl: 'hippy.png',
        links: {
          post: '/project-hippy',
          github: 'https://github.com/woori-hippy/hippy_front',
          demo: null,
        },
      },
      {
        title: 'Gamp',
        date: '21.05.21 ~ 21.05.23',
        description:
          'JunctionxSeoul 해커톤에서 진행한 프로젝트입니다. 음성 채팅 서비스가 없는 게임에서 게임이 시작하면 팀원들과 자동으로 음성 매칭을 해주는 서비스입니다. 음성 채팅 기능을 구현하기 위해 AWS Chime SDK를 프론트엔드에 적용했습니다. 처음으로 디자이너, 기획자와 협업한 프로젝트입니다. 상태관리와 음성채팅 기능을 구현했고 디자이너분과 계속 대화하면서 웹디자인에 대한 시야를 넓힌 경험이 되었습니다. ',
        techStack: ['React', 'Redux', 'Material-ui', '우승'],
        thumbnailUrl: 'gamp.png',
        links: {
          post: '/project-gamp',
          github: 'https://github.com/junction-hippy/junction_hippy_front',
          demo: null,
        },
      },
      {
        title: 'Upgle',
        date: '21.06.19 ~ ',
        description:
          '교내 개발자 소모임인 잔디에서 방학 동안 진행하는 프로젝트입니다. 사람들이 자유롭게 자신의 재능을 공유할 수 있는 플랫폼입니다. 슬랙의 workspace처럼 자유롭게 참여해 대화를 하거나 게시글을 남기는 등으로 재능을 공유할 수 있습니다. 아이디어 선정, 기획부터 시작해서 현재 기능을 개발하고 있는 중입니다.',
        techStack: ['React', 'Redux', 'Material-ui'],
        thumbnailUrl: 'upgle.png',
        links: {
          post: '/project-upgle',
          github: 'https://github.com/Jandy-SeoulTech/Jandy_Web_Front',
          demo: 'upgle.hisfolio.com',
        },
      },
    ],
  },
};
