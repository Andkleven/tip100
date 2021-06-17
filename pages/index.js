import { useState, useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useSWR, { mutate } from "swr";

export default function Home() {
  const { control, handleSubmit } = useForm();
  const { data } = useSWR(`/api`, (url) =>
    fetch(url).then((res) => res.json())
  );

  async function submit(data) {
    await fetch("/api", {
      body: JSON.stringify(data),
      method: "POST",
    });
    mutate("/api");
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
                    {data ? (
                      <>
                        <TableHead>
                          <TableRow>
                            <TableCell align="right">Test1</TableCell>
                            <TableCell align="right">Test2</TableCell>
                            <TableCell align="right">Test3</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell align="right">{row.test1}</TableCell>
                              <TableCell align="right">{row.test2}</TableCell>
                              <TableCell align="right">{row.test3}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </>
                    ) : null}
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
