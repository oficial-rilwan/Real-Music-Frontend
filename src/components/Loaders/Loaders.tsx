import React from "react";
import Skeleton from "@mui/material/Skeleton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./styles/styles.module.css";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

interface ArtisteLoaderProps {
  count: number;
}
interface TrackLoaderProps {
  count: number;
}
interface TableLoaderProps {
  count: number;
}
interface PlaylistLoaderProps {
  count: number;
  styles: any;
}
interface MultiplePlaylistLoadersProps {
  styles: any;
}

const TrackLoader = ({ count }: TrackLoaderProps) => {
  return (
    <React.Fragment>
      {Array(count)
        .fill("")
        .map((_: any, index: number) => (
          <div key={index} className="box">
            <Skeleton variant="rounded" height={180} />
            <div className="content">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};
const MultipleTrackLoaders = () => {
  return (
    <section className="trending">
      <div className="items">
        <React.Fragment>
          {Array(8)
            .fill("")
            .map((_: any, index: number) => (
              <div key={index} className="box">
                <Skeleton variant="rounded" height={180} />
                <div className="content">
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>
              </div>
            ))}
        </React.Fragment>
      </div>
    </section>
  );
};
const PlaylistLoader = ({ count, styles }: PlaylistLoaderProps) => {
  return (
    <React.Fragment>
      {Array(count)
        .fill("")
        .map((_: any, index: number) => (
          <div key={index} className={styles.trackGrid}>
            <div>
              <Skeleton variant="rounded" height={180} />
            </div>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
        ))}
    </React.Fragment>
  );
};

const ArtisteLoader = ({ count }: ArtisteLoaderProps) => {
  return (
    <React.Fragment>
      {Array(count)
        .fill("")
        .map((_: any, index: number) => (
          <div key={index} className="box artists">
            <Skeleton
              className="img"
              variant="circular"
              width={180}
              height={180}
            />
            <div className="content">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};
const MultipleArtisteLoaders = () => {
  return (
    <section className="trending">
      <div className="artists">
        <React.Fragment>
          {Array(8)
            .fill("")
            .map((_: any, index: number) => (
              <div key={index} className="box">
                <div>
                  <Skeleton className="img" variant="circular" />
                </div>
                <div className="content">
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>
              </div>
            ))}
        </React.Fragment>
      </div>
    </section>
  );
};
const MultiplePlaylistLoaders = () => {
  return (
    <section className="trending">
      <div className="playlists">
        <React.Fragment>
          {Array(8)
            .fill("")
            .map((_: any, index: number) => (
              <div key={index} className={styles.trackGrid}>
                <div className={styles.img_box}>
                  <Skeleton className={styles.img} variant="circular" />
                </div>

                <div className={styles.content}>
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>
              </div>
            ))}
        </React.Fragment>
      </div>
    </section>
  );
};

const BigTableLoader = ({ count }: TableLoaderProps) => {
  return (
    <React.Fragment>
      <TableContainer component={Paper} style={{ background: "transparent" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ paddingLeft: 20, width: 40 }}>#</TableCell>
              <TableCell style={{ paddingLeft: 6 }}>TITLE</TableCell>
              <TableCell>ALBUM</TableCell>
              <TableCell>DATE ADDED</TableCell>
              <TableCell align="center">
                <AccessTimeIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array(count)
              .fill("")
              .map((_: any, index: number) => (
                <TableRow
                  style={{ background: index % 2 === 0 ? "#f1f1f1" : "" }}
                  key={index}
                >
                  <TableCell
                    style={{ padding: "0 0 0 6px", width: 40 }}
                  ></TableCell>
                  <TableCell style={{ padding: "8px 16px" }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell style={{ padding: "8px 16px" }}>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell style={{ padding: "8px 16px" }}>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell style={{ padding: "8px 16px" }} align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};
const SmallTableLoader = ({ count }: TableLoaderProps) => {
  return (
    <React.Fragment>
      <TableContainer component={Paper} style={{ background: "transparent" }}>
        <Table>
          <TableBody>
            {Array(count)
              .fill("")
              .map((_: any, index: number) => (
                <TableRow
                  style={{ background: index % 2 === 0 ? "#f1f1f1" : "" }}
                  key={index}
                >
                  <TableCell
                    style={{ padding: "0 0 0 6px", width: 40 }}
                  ></TableCell>
                  <TableCell style={{ padding: "8px 16px" }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell style={{ padding: "8px 16px" }}>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export {
  ArtisteLoader,
  TrackLoader,
  BigTableLoader,
  SmallTableLoader,
  PlaylistLoader,
  MultipleTrackLoaders,
  MultipleArtisteLoaders,
  MultiplePlaylistLoaders,
};
