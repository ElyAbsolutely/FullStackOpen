import React from "react";
import { Card, Divider } from "@material-ui/core";

import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import DiagnosesList from "./DiagnosesList";

import { Icon } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";

const cardStyle = { margin: "10px", padding: "8px", border: "1px groove gray", borderRadius: "10px" };

export const EntryHealthcheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
    <Card style={cardStyle}>
        <h2>Health Check <Icon component={FavoriteIcon} /></h2>
        <p><b>Diagnosed by: </b>{entry.specialist} <b>Health rating: </b>{entry.healthCheckRating}</p>
        <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
        <EntryDescription description={entry.description} />
        <Divider />
        <p><small><b>Date:</b> {entry.date} <b>ID:</b> {entry.id}</small></p>
    </Card >
);

export const EntryHospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
    <Card style={cardStyle}>
        <h2>Hospital visit <Icon component={LocalHospitalIcon} /></h2>
        <p><b>Diagnosed by: </b>{entry.specialist}</p>
        <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
        <p><b>Discharge</b></p>
        <p><b>-Date: </b>{entry.discharge.date} <b>-Criteria: </b>{entry.discharge.criteria}</p>
        <EntryDescription description={entry.description} />
        <Divider />
        <p><small><b>Date:</b> {entry.date} <b>ID:</b> {entry.id}</small></p>
    </Card>
);

export const EntryOccupational: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
    <Card style={cardStyle}>
        <h2>Occupational Healthcare <Icon component={WorkIcon} /></h2>
        <p><b>Diagnosed by: </b>{entry.specialist} <b>Employer: </b>{entry.employerName}</p>
        <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
        <EntryDescription description={entry.description} />
        <Divider />
        <p><small><b>Date:</b> {entry.date} <b>ID:</b> {entry.id}</small></p>
    </Card>
);

const descriptionStyle = { margin: "2px", padding: "10px", borderRadius: "4px" };
const h3Style = { margin: "0px" };
const DividerStyle = { width: "25%", height: "2px" };

const EntryDescription: React.FC<{ description: string }> = ({ description }) => (
    <Card style={descriptionStyle}>
        <h3 style={h3Style}>Description:</h3>
        <Divider style={DividerStyle} />
        <p>{description}</p>
    </Card>
);