import React from "react";
import { List, ListItem, Container } from "@material-ui/core";

import { Diagnosis } from "../../types";
import { useStateValue } from "../../state";

interface DiagnosisProps { diagnosisCodes: Array<Diagnosis["code"]>; }

const listStyle = { padding: "0px", margin: "5px" };

const listH4Style = { padding: "5px", margin: "5px" };

const listItemStyle = { padding: "2px" };

const DiagnosesList: React.FC<DiagnosisProps> = ({ diagnosisCodes }) => {
    const [{ diagnosis }] = useStateValue();

    if (!diagnosisCodes)
        return null;

    return (
        <Container>
            <h4 style={listH4Style}>Diagnosed codes:</h4>
            <List style={listStyle}>
                {diagnosisCodes.map((code) => {
                    if (!diagnosis)
                        return (<ListItem style={listItemStyle} key={0}><b>{code}</b>: Unknown code</ListItem>);
                    else {
                        for (let x = 0; x < diagnosis.length; x++)
                            if (code === diagnosis[x].code)
                                return (
                                    <ListItem style={listItemStyle} key={0}><b>{code}</b>: {diagnosis[x].name}</ListItem>
                                );
                        return (
                            <ListItem style={listItemStyle} key={0}><b>{code}</b>: Unknown code</ListItem>
                        );
                    }
                })}
            </List>
        </Container >
    );
};

export default DiagnosesList;