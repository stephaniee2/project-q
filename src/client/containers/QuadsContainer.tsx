/**
 * @module QuadsContainer.tsx
 * @description Quads Container for User Dashboard
 */

import * as React from 'react';
import { connect } from 'react-redux';

// Import Actions
import * as actions from '../actions/actionCreators';

// Import Components
import Header from '../containers/HeaderContainer';
import QuadsDisplay from '../components/QuadsDisplay';

// Import CSS
import '../assets/QuadsContainer.css';

// TODO when store structure finalized
interface Props {
  selectedCompany: any;
  selectedCompanyData: any;
  companyList: any;
  currentCompanyStockData: any;
  userIssues: any;
  issueAbbrvs: any;
  fetchCompanyList: any;
  sortCompanyList: any;
  selectCompany: any;
  getUserIssues: any;
  getAllCompanyInfo: any;
  getStockData: any;
  getSelectedCompanyInfo: any;
  resetUserIssues: any;
  hoverOn: any;
  hoverOff: any;
  displayDetails: boolean;
  hoverOverviewInfo: any;
  togglePortfolio: any;
  filterSector: any;
}

// TODO when store structure finalized
class QuadsContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const {
      getUserIssues,
      fetchCompanyList
      // getAllCompanyInfo
    } = this.props;

    getUserIssues();
    fetchCompanyList();
    // getAllCompanyInfo();
  }

  componentWillUnmount() {
    const { resetUserIssues } = this.props;
    resetUserIssues();
  }

  render() {
    // Extract state to props
    const {
      companyList,
      currentCompanyStockData,
      displayDetails,
      filterSector,
      getSelectedCompanyInfo,
      getStockData,
      hoverOff,
      hoverOn,
      hoverOverviewInfo,
      issueAbbrvs,
      selectCompany,
      selectedCompany,
      selectedCompanyData,
      sortCompanyList,
      togglePortfolio,
      userIssues
    } = this.props;

    return (
      <div className="main-dashboard">
        <div className="header">
          <Header />
        </div>
        <div id="quads-container">
          <QuadsDisplay
            info={getSelectedCompanyInfo}
            list={companyList}
            select={selectCompany}
            selected={selectedCompany}
            selectedData={selectedCompanyData}
            sort={sortCompanyList}
            stock={getStockData}
            stockData={currentCompanyStockData}
            issues={userIssues}
            abbrvs={issueAbbrvs}
            hoverOn={hoverOn}
            hoverOff={hoverOff}
            displayDetails={displayDetails}
            hoverOverviewInfo={hoverOverviewInfo}
            togglePortfolio={togglePortfolio}
            filterSector={filterSector}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
  currentCompanyStockData: state.company.currentCompanyStockData,
  selectedCompany: state.company.selectedCompany,
  selectedCompanyData: state.company.selectedCompanyData,
  userIssues: state.company.userIssues,
  issueAbbrvs: state.company.issueAbbrvs,
  displayDetails: state.company.displayDetails,
  hoverOverviewInfo: state.company.hoverOverviewInfo
});

const mapDispatchToProps = (dispatch: any): any => ({
  fetchCompanyList: () => dispatch(actions.fetchCompanyList()),
  selectCompany: (event: any, ticker: any) => {
    event.preventDefault();
    dispatch(actions.selectCompany({ field: event.target.id }));
    setTimeout(() => dispatch(actions.getStockData(ticker)), 1500);
    setTimeout(() => dispatch(actions.getSelectedCompanyInfo(ticker)), 1500);
  },
  sortCompanyList: (event: any) => {
    event.preventDefault();
    dispatch(actions.sortCompanyList({ field: event.target.id }));
  },
  getUserIssues: () => dispatch(actions.getUserIssues()),
  getAllCompanyInfo: () => {
    dispatch(actions.getAllCompanyInfo());
  },
  getStockData: (ticker: string) => {
    dispatch(actions.getStockData(ticker));
  },
  getSelectedCompanyInfo: (ticker: string) => {
    dispatch(actions.getSelectedCompanyInfo(ticker));
  },
  resetUserIssues: () => {
    dispatch(actions.resetUserIssues());
  },
  hoverOn: (blurb: string, name: string, alignedScore: number) => {
    dispatch(actions.hoverOn({ blurb, name, alignedScore }));
  },
  hoverOff: () => dispatch(actions.hoverOff()),
  togglePortfolio: (e: any) =>
    dispatch(actions.togglePortfolio(e.target.value)),
  filterSector: (e: any) => dispatch(actions.filterSector(e.target.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuadsContainer) as any;
