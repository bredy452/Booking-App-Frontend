import React, { Component } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import InteractionPlugin from "@fullcalendar/interaction";

export default class BookingCompanyChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      companyChoice: [],
      bookedDates: [],
    };
  }

  pushSchedule = (e) => {
    e.preventDefault();
    this.setState({
      companyChoice: e.target.textContent,
      bookedDates: [],
    });
  };

  getBookedDates = (e) => {
    fetch(
      this.props.baseUrl +
        `/schedules/client_schedule/${this.state.companyChoice}`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message === "Schedule does not exist") {
          return;
        } else {
          let arr = [];
          arr = data.data.client_availability.split(",");
          console.log(arr);
          let newArr = [];
          let masterArr = [];
          const copybookedDates = [...this.state.bookedDates];

          for (let j = 0; j < arr.length; j += 4) {
            let bitArr = arr.slice(j, j + 4);
            newArr.push(bitArr);
          }

          for (let x = 0; x < newArr.length; x++) {
            let chunk = newArr[x];
            let tempObj = {};
            for (let y = 0; y < chunk.length; y++) {
              if (y % 2 === 0) {
                let key = chunk[y];
                let value = chunk[y + 1];
                tempObj[key] = value;
              }
            }
            copybookedDates.push(tempObj);
          }
          this.setState({
            bookedDates: copybookedDates,
          });
        }
      });
  };

  getSchedule = (e) => {
    this.getBookedDates();
    fetch(this.props.baseUrl + `/schedules/${this.state.companyChoice}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message === "Schedule does not exist") {
          this.setState({
            noSchedule: true,
          });
          alert(`${this.state.companyChoice} has not posted a schedule`);
          this.props.noSchedule(this.state.noSchedule);
        } else {
          this.props.noSchedule(false);
          let arr = [];
          arr = data.data.availability.split(",");
          let newArr = [];
          let masterArr = [];

          for (let j = 0; j < arr.length; j += 6) {
            let bitArr = arr.slice(j, j + 6);
            newArr.push(bitArr);
          }

          for (let x = 0; x < newArr.length; x++) {
            let chunk = newArr[x];
            let tempObj = {};

            for (let y = 0; y < chunk.length; y++) {
              if (y % 2 == 0) {
                let key = chunk[y];
                let value = chunk[y + 1];
                tempObj[key] = value;
              }
            }

            masterArr.push(tempObj);
          }

          this.state.bookedDates.forEach((item) => {
            masterArr.push(item);
          });
          this.props.bookingSchedule(masterArr, this.state.companyChoice);
        }
      });
  };

  getCompanies = () => {
    fetch(this.props.baseUrl + "/users/organizations", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let companies = [];

        data.organizations[0].forEach((name, index) => {
          companies.push({ text: name.org_name, value: name.org_name });
        });

        this.setState({
          companies: companies,
        });
      });
  };

  componentDidMount() {
    this.getCompanies();
  }

  render() {
    let companyOptions = this.state.companies;

    return (
      <>
        <Dropdown
          placeholder="Company Selection"
          fluid
          options={companyOptions}
          search
          selection
          onChange={(e) => {
            this.pushSchedule(e);
          }}
        />

        <Button
          primary
          schedule
          onClick={(e) => {
            this.getSchedule(e);
          }}
        >
          View Availability
        </Button>
      </>
    );
  }
}
