import React from 'react';
import groupBy from 'lodash/groupBy';

import {apiBuilder} from '../shared/NodeApi';
import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';
import Alias from '../shared/Alias';

import TransactionList from './TransactionList';
import AssetList from './AssetList';
import GroupedAliasList from './GroupedAliasList';
import Tabs from './Tabs';
import Pane from './Pane';
import BalanceDetails from './BalanceDetails';
import transactionMapper from './TransactionMapper';

const transactions = [{
    id: 'CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS',
    type: 7,
    date: '00.00.0000',
    time: '00:00:00',
    sender: '3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he',
    recipient: '3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3',
    in: {
        amount: '182.56761789',
        currency: 'WAVES'
    },
    out: {
        amount: '0.09787450',
        currency: 'BTC'
    },
    price: {
        amount: '245.28404366',
        currency: 'WAVES'
    }
}, {
    id: 'CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS',
    type: 11,
    date: '00.00.0000',
    time: '00:00:00',
    direction: 'outgoing',
    recipient: '3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he',
    in: {
        amount: '100000.00000000',
        currency: 'profitbot'
    },
    spam: true
}];

export default class SingleAddressPage extends React.Component {

    state = {
        balance: {},
        assets: [],
        aliases: [],
        transactions: [],
        selectedTabIndex: 0
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId ||
            this.props.match.params.address !== prevProps.match.params.address) {
            this.fetchData();
        }
    }

    fetchData() {
        const {networkId, address} = this.props.match.params;
        const api = apiBuilder(networkId);

        api.addresses.details(address).then(balanceResponse => {
            this.setState({balance: balanceResponse.data});
        });

        this.fetchTabData(this.state.selectedTabIndex);
    }

    fetchTabData(selectedIndex) {
        const {networkId, address} = this.props.match.params;
        const api = apiBuilder(networkId);

        switch (selectedIndex) {
            case 0:
                api.transactions.address(address).then(transactionsResponse => {
                    const transactions = transactionsResponse.data[0].map(item => transactionMapper(item, address));

                    this.setState({transactions});
                });

                break;
            case 1:
                api.addresses.aliases(address).then(aliasesResponse => {
                    const lines = aliasesResponse.data.map(item => Alias.fromString(item).alias);
                    const grouped = groupBy(lines, item => item.toUpperCase().charAt(0));
                    const aliases = Object.keys(grouped).sort().map(letter => ({
                        letter,
                        aliases: grouped[letter].sort()
                    }));

                    this.setState({aliases});
                });

                break;
            case 2:
                api.addresses.assetsBalance(address).then(balanceResponse => {
                    const assets = balanceResponse.data.balances.map(item => {
                        return {
                            id: item.assetId,
                            name: item.issueTransaction.name,
                            amount: item.balance
                        };
                    });

                    this.setState({assets});
                });

                break;
        }
    }

    handleTabActivate = (selectedIndex) => {
        this.fetchTabData(selectedIndex);
    };

    render() {
        return (
            <React.Fragment>
                <GoBack />
                <Headline title="Address" subtitle={this.props.match.params.address} />
                <BalanceDetails balance={this.state.balance} />
                <Tabs onTabActivate={this.handleTabActivate} selectedIndex={this.state.selectedTabIndex}>
                    <Pane title="Last 100 transactions">
                        <TransactionList transactions={this.state.transactions} />
                    </Pane>
                    <Pane title="Aliases">
                        <GroupedAliasList aliases={this.state.aliases} />
                    </Pane>
                    <Pane title="Assets">
                        <AssetList assets={this.state.assets} />
                    </Pane>
                </Tabs>
            </React.Fragment>
        );
    }
}