import React, { Component } from "react";
import RepLogList from './RepLogList';
import RepLogCreator from './RepLogCreator';
import propTypes from 'prop-types';


function calculateTotalWeightLifted(repLogs) {
    let total = 0;

    for (let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }

    return total;
}

/**
 * primeiro temos uma arrow function q recebe um unico parametro (repLogs): repLogs => functionBody
 *  Como ela n tem parenteses, significa q a única linha dela já é o return dela, q nesse caso, o return dela é o .reduce()
 * Logo no primeiro parametro do reduce nós passamos outra arrow function
 */
const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);


export default function RepLogs(props) {
    const { 
        withHeart, 
        highlightedRowId, 
        onRowClick, 
        repLogs, 
        onAddRepLog 
    } = props;

    let heart = '';
    if (withHeart) {
        heart = <span>Coração!</span>
    }


    return (
        <div className="col-md-7">
            <h2>Lift History {heart}</h2>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <RepLogList 
                    highlightedRowId={highlightedRowId} 
                    onRowClick={onRowClick}
                    repLogs={repLogs}
                />
                <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <th>Total</th>
                        <th>{calculateTotalWeightFancier(repLogs)} lbs</th>
                        <td>&nbsp;</td>
                    </tr>
                </tfoot>
            </table>

            <RepLogCreator 
                onAddRepLog={onAddRepLog}
            />

        </div>
    );
}


RepLogs.propTypes = {
    withHeart : propTypes.bool, 
    highlightedRowId : propTypes.any, 
    onRowClick : propTypes.func.isRequired,
    onAddRepLog : propTypes.func.isRequired,
    repLogs : propTypes.array.isRequired
};