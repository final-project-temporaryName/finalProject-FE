import Card from './Card';
import NoContent from './NoContent';

interface CardData {
  id: number;
  saleStatus: 'isFree' | 'forSale' | 'notForSale';
  workImageUrl: string;
  workTitle: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  profileImageUrl: string;
  authorName: string;
  workUrl: string;
  authorUrl: string;
  displayStatus: 'myWork' | 'notMyWork';
}

function CardContainer() {
  const data: CardData[] = [
    {
      id: 1,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 1',
      likeCount: 1100,
      viewCount: 999,
      commentCount: 1,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 1',
      workUrl: '/1',
      authorUrl: '/author1',
      displayStatus: 'myWork',
    },
    {
      id: 2,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 3,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 4,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 5,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 6,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 7,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 8,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 9,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 10,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 11,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 12,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 13,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 14,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 15,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 16,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
    {
      id: 17,
      saleStatus: 'isFree',
      workImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      workTitle: '모의 작품 제목 2',
      likeCount: 900,
      viewCount: 777,
      commentCount: 3,
      profileImageUrl:
        'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: '모의 작가이름 2',
      workUrl: '/2',
      authorUrl: '/author2',
      displayStatus: 'myWork',
    },
  ];

  return (
    <div
      style={{ height: data && data.length > 0 ? 'auto' : '50vh' }}
      className={`${data && data.length > 0 ? 'mt-25 flex h-auto w-auto flex-wrap gap-33' : 'mt-25 flex w-full items-center justify-center'}`}
    >
      {data && data.length > 0 ? (
        data.map((card) => (
          <Card
            key={card.id}
            saleStatus={card.saleStatus}
            workImageUrl={card.workImageUrl}
            workTitle={card.workTitle}
            likeCount={card.likeCount}
            viewCount={card.viewCount}
            commentCount={card.commentCount}
            profileImageUrl={card.profileImageUrl}
            authorName={card.authorName}
            workUrl={card.workUrl}
            authorUrl={card.authorUrl}
            displayStatus={card.displayStatus}
          />
        ))
      ) : (
        <NoContent />
      )}
    </div>
  );
}

export default CardContainer;
