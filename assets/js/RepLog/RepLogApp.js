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
            newRepLogValidationErrorMessage: ''
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


        const newState = {
            isSavingNewRepLog: false,
        };

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];

                    return {
                        ...newState,
                        repLogs: newRepLogs,
                        newRepLogValidationErrorMessage: '',
                    };
                });

                this.setSuccessMessage('Rep Log Saved!');
            })
            .catch(error => {
                error.response.json().then(errorsData => {
                    console.log(errorsData)
                    const errors = errorsData.errors;
                    const firstError = errors[Object.keys(errors)[0]];
                    this.setState({
                        newRepLogValidationErrorMessage : firstError,
                    })
                });
            })
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

        /**
         * Isso daqui é uma gambiarra para adicionar uma nova propriedade a um objeto que está dentro do state
         * sem fazer uma mutate, pois isso é proibido.
         */
        this.setState((prevState) => {
            return {
                repLogs : prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        return repLog;
                    }
                    //return Object.assign({}, repLog, {isDeleting: true})
                    return {...repLog, isDeleting: true}
                })
            }
        });

        deleteRepLog(id)
            .then(() => {

                this.setState(prevState => {
                    return {
                        repLogs: prevState.repLogs.filter(repLog => repLog.id != id)
                    }
                })

                this.setSuccessMessage('Deleted');
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