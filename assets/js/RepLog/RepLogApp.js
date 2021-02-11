import React, { Component } from "react";
import RepLogs from './RepLogs';
import propTypes from 'prop-types';
import { v4 as uuid} from 'uuid';
import { getRepLogs, deleteRepLog, createRepLog } from '../api/rep_log_api';

export default class RepLogApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs : [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
        };

        this.successMessageTimeoutHandle = 0;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }

    /**
     * é chamado depois que o componente foi renderizado na página
     */
    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs : data,
                    isLoaded: true,
                })
            })
    }

    /**
     * é chamado quando o componente é removido
     */
    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }


    handleRowClick(replogid) {
        this.setState({highlightedRowId : replogid})
    }

    handleAddRepLog(item, reps) {
        const newRep = {
            reps: reps,
            item: item,
        };

        this.setState({
            isSavingNewRepLog: true
        });

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];
                    return {
                        repLogs: newRepLogs,
                        isSavingNewRepLog: false,
                    };
                });

                this.setSuccessMessage('Rep Log Saved!');
            });
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage : message
        });

        clearTimeout(this.successMessageTimeoutHandle);
        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage : ''
            });

            this.successMessageTimeoutHandle = 0;
        }, 3000);

    }

    handleHeartChange(heartCount) {
        this.setState({numberOfHearts : heartCount});
    }

    handleDeleteRepLog(id) {

        deleteRepLog(id);

        this.setState(prevState => {
            return {
                repLogs: prevState.repLogs.filter(repLog => repLog.id != id)
            }
        })

    }

    render() {

        return (
            <RepLogs 
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        );
    }
}


RepLogApp.propTypes = {
    withHeart : propTypes.bool
}