import { Gap } from "type/option";

function GapStylePC(gap: Gap) {
  switch (gap) {
    case "XS": {
      return "25px";
    }
    case "S": {
      return "50px";
    }
    case "M": {
      return "100px";
    }
    case "L": {
      return "150px";
    }
    case "XL": {
      return "200px";
    }
    default: {
      return "25px";
    }
  }
}

export { GapStylePC };
