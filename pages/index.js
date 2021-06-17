import { useState, useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";

export default function Home() {
  const { control, handleSubmit } = useForm();
  const [state, setState] = useState([]);

  async function getData() {
    const res = await fetch(`/api`);
    const data = await res.json();
    console.log(data);
    setState(data);
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(state);

  async function submit(data) {
    const res = await fetch("/api", {
      body: JSON.stringify(data),
      method: "POST",
    });
    const response = await res.json();
    console.log(response);
    setState((prevState) => {
      prevState.push(response);
      return [...prevState];
    });
  }
  return (
    <div>
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <Container>
          <Paper elevation={2}>
            <div style={{ padding: "1.5em 0" }}>
              <Container>
                <form onSubmit={handleSubmit(submit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        control={control}
                        name="test1"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="time"
                            label="Test1"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="test2"
                        render={({ field }) => (
                          <TextField {...field} fullWidth label="Test2" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="test3"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            fullWidth
                            label="Test3"
                          />
                        )}
                      />
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ height: "100%" }}
                    >
                      Lagre
                    </Button>
                    {state.map((data, index) => (
                      <Fragment key={index}>
                        <h5>Test1: {data.test1},</h5>
                        <h5>Test2: {data.test2},</h5>
                        <h5>Test3: {data.test3}</h5>
                      </Fragment>
                    ))}
                  </Grid>
                </form>
              </Container>
            </div>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
