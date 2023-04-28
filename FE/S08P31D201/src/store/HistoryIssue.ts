import { atom } from 'recoil';

export type TteamMember = {
  memberId: number;
  memberImg: string;
  memberName: string;
  memberTeam: string;
};

export type TtableData = {
  date: string;
  issue: string[];
  team: number;
  violate_img: string;
  violate_member?: TteamMember;
  teamList: TteamMember[];
};

const team1: TteamMember[] = [
  {
    memberId: 1,
    memberImg: '',
    memberName: '성광현',
    memberTeam: '삼성전기 1팀',
  },
  {
    memberId: 2,
    memberImg: '',
    memberName: '윤소현',
    memberTeam: '삼성전기 1팀',
  },
];

const team2: TteamMember[] = [
  {
    memberId: 3,
    memberImg: '',
    memberName: '정재현',
    memberTeam: '삼성전기 2팀',
  },
  {
    memberId: 4,
    memberImg: '',
    memberName: '이석원',
    memberTeam: '삼성전기 2팀',
  },
];

const team3: TteamMember[] = [
  {
    memberId: 5,
    memberImg: '',
    memberName: '이용훈',
    memberTeam: '삼성전기 3팀',
  },
  {
    memberId: 6,
    memberImg: '',
    memberName: '배상준',
    memberTeam: '삼성전기 3팀',
  },
];

const team4: TteamMember[] = [
  {
    memberId: 7,
    memberImg: '',
    memberName: '아인슈타인',
    memberTeam: '삼성전기 4팀',
  },
  {
    memberId: 8,
    memberImg: '',
    memberName: '테슬라',
    memberTeam: '삼성전기 4팀',
  },
];

const dummyData: TtableData[] = [
  {
    date: '2023-04-10 11:00',
    issue: ['안전모'],
    team: 1,
    violate_img:
      'https://www.enewstoday.co.kr/news/photo/202204/1566109_621853_1110.jpg',
    teamList: team1,
  },
  {
    date: '2023-04-10 11:30',
    issue: ['안전모', '앞치마'],
    team: 1,
    violate_img:
      'https://www.enewstoday.co.kr/news/photo/202204/1566109_621853_1110.jpg',
    teamList: team1,
  },
  {
    date: '2023-04-10 13:58',
    issue: ['보안경'],
    team: 1,
    violate_img:
      'https://www.safety.or.kr/resources/safety/img/business/top/st2.jpg',
    teamList: team1,
  },
  {
    date: '2023-04-10 14:10',
    issue: ['안전모'],
    team: 2,
    violate_img:
      'https://www.safety.or.kr/resources/safety/img/business/top/st2.jpg',
    teamList: team2,
  },
  {
    date: '2023-04-10 20:13',
    issue: ['안전모', '장갑'],
    team: 2,
    violate_img: 'https://www.m-i.kr/news/photo/202109/859719_629831_4819.jpg',
    teamList: team2,
  },
  {
    date: '2023-04-10 23:10',
    issue: ['보안경'],
    team: 3,
    violate_img: 'https://www.m-i.kr/news/photo/202109/859719_629831_4819.jpg',
    teamList: team3,
  },
  {
    date: '2023-04-10 23:20',
    issue: ['보안경'],
    team: 3,
    violate_img: 'https://www.m-i.kr/news/photo/202109/859719_629831_4819.jpg',
    teamList: team3,
  },
  {
    date: '2023-04-11 05:59',
    issue: ['앞치마'],
    team: 3,
    violate_img:
      'https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000028577/4eabac6ba112474586415825282bff2f.jpg',
    teamList: team3,
  },
  {
    date: '2023-04-11 09:00',
    issue: ['팔토시', '앞치마'],
    team: 4,
    violate_img:
      'https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000028577/4eabac6ba112474586415825282bff2f.jpg',
    teamList: team4,
  },
  {
    date: '2023-04-11 10:30',
    issue: ['팔토시', '안전모'],
    team: 4,
    violate_img:
      'https://cdn.kmecnews.co.kr/news/photo/202102/9041_4805_3325.jpg',
    teamList: team4,
  },
  {
    date: '2023-04-11 11:20',
    issue: ['방진마스크', '보안경'],
    team: 4,
    violate_img:
      'https://cdn.kmecnews.co.kr/news/photo/202102/9041_4805_3325.jpg',
    teamList: team4,
  },
];

const HistoryIssue = atom({
  key: 'HistoryIssue',
  default: dummyData,
});

export { HistoryIssue };
