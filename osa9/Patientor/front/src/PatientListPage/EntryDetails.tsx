import React from "react";

import { Entry } from "../types";
import { EntryHealthcheck, EntryHospital, EntryOccupational } from "./Entrys/EntryTypes";

const assertNever = (value: never): never => { throw new Error("Unhandled discriminated union member: " + JSON.stringify(value)); };

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return (<EntryHospital entry={entry} />);
        case "OccupationalHealthcare":
            return (<EntryOccupational entry={entry} />);
        case "HealthCheck":
            return (<EntryHealthcheck entry={entry} />);
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;