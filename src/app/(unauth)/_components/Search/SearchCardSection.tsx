import CardContainer from '@/components/Card/CardContainer';
import SearchResult from './SearchResult';

function SearchCardSection() {
  return (
    <div className="flex-col-center relative mt-100">
      <SearchResult />
      <CardContainer type="search" categoryType={'전체'} />
    </div>
  );
}

export default SearchCardSection;
