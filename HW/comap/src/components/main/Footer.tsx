import { Container, Grid, Link, Typography } from '@mui/material'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer >
      <Container maxWidth="lg" sx={{
        backgroundColor: "red",
        width: `100%`,
        position: "relative",
        left:"0",
        bottom:"0",
        overflow: "hidden",
        marginTop: "6em",
        padding: "2em 0 ",
        height: "100%",
        borderRadius: "1em"
      }}>
        <Grid >
            <Grid item>
              <Link >
                <Typography sx={{
                    fontSize: "1.25em",
                    color: "#fff", fontWeight:"bold", borderBottom:"1px solid #757ce8"
                    }}>
                  HELLOT
                </Typography>
              </Link>
            </Grid>
        </Grid>
        <Grid container direction="column" style={{ margin: "1.2em 0" }}>
          {/* //<Social /> */}
        </Grid>
        <Grid>
          <Typography sx={{
    color: "#fff",
    fontSize: "1em"}}>
            &copy;Satoru Akiyama
          </Typography>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer