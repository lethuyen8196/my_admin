import React, { useState, useEffect } from "react";
import * as appActions from "../../core/app.store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import dateformat from "dateformat";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "../../components/filter/filter.view";
import FooterPagination from "../../components/footer-pagination/pagination";
import { useLocation } from 'react-router-dom';
import history from "../../common/history";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    tableContainer: {
        maxHeight: window.outerHeight - 365,
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    appBar: {
        position: "relative",
        backgroundColor: "#00923F",
    },
    title: {
        marginLeft: theme.spacing(0),
        flex: 1,
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));


const MoodsManagement = (props) => {
    const { showLoading } = props;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const classes = useStyles();

    const [orderBy, setOrderBy] = useState('modifiedDate');
    const [order, setOrder] = useState('desc');
    const pageIndex = 1;
    const pageSize = 10;
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        let params = getParamsFromQuery();
        GetListAll(params);
    }, [location.search])

    const getParamsFromQuery = () => {
        return {
            pageSize: queryParams.get("pageSize") || pageSize,
            pageIndex: queryParams.get("pageIndex") || pageIndex,
            sorting: queryParams.get("sorting"),
        }
    }

    const GetListAll = (params) => {
        // showLoading(true);
        // sceneAction.VrProjectGetListAll(params).then(res => {
        //     if (res && res.content) {
        //         const { items, pageCount, pageIndex, pageSize, totalItemCount } = res.content || {};
        //         setEditionModel(items);
        //         setPagination({ ...pagination, pageCount, pageIndex, pageSize, totalItemCount });
        //     }
        //     showLoading(false);
        // }).catch(err => {
        //     showLoading(false);
        //     console.log(err);
        // })
    }

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const onRequestSort = (event, property) => {
        console.log(event, property)
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        let sort = isAsc ? 'desc' : 'asc';
        let sorting = property + ' ' + sort;
        queryParams.set('sorting', sorting)
        history.push({
            search: queryParams.toString(),
        })
    }

    const listTableCell = [
        { id: 'avatar', hideSortIcon: false, isSort: true, label: 'Avatar', width: '' },
        { id: 'title', hideSortIcon: false, isSort: true, label: 'Title', width: '' },
        { id: 'description', hideSortIcon: false, isSort: true, label: 'Description', width: '' },
        { id: 'created_date', hideSortIcon: false, isSort: true, label: 'Created Date', width: '' },
        { id: 'created_by', hideSortIcon: false, isSort: true, label: 'Created By', width: '' },
        { id: 'modified_date', hideSortIcon: false, isSort: true, label: 'Modified Date', width: '' },
        { id: 'modified_by', hideSortIcon: false, isSort: true, label: 'Modified By', width: '' },
        { id: 'action', hideSortIcon: false, isSort: true, label: '', width: '17%' },
    ]

    return (
        <div>
            <div className="filter mb-3">
                <Filter
                    hasName
                    // hasPhone
                    // hasBed
                    // hasService
                    // hasBooking
                    // hasDone
                    hasFromToDate
                    hasExport
                />
            </div>
            <div className="list-booking">
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {listTableCell.map(item => (
                                            <TableCell
                                                key={item.id}
                                                className={
                                                    "pt-3 pb-3 text-nowrap " +
                                                    (item.id === "title" ? "MuiTableCell-freeze header_title" : "")
                                                }
                                            // width={(item.id === "title" ? "25%": "")}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === item.id}
                                                    direction={orderBy === item.id ? order : 'asc'}
                                                    onClick={item.isSort ? createSortHandler(item.id) : null}
                                                    hideSortIcon={item.hideSortIcon ? true : false}>
                                                    {item.label}
                                                    {/* {orderBy === item.id ? (
                                                            <span>
                                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                            </span>
                                                        ) : null} */}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {data && data.length > 0 && data.map((item) => {
                                    if (!item.isDelete)
                                        return (
                                            <TableRow hover tabIndex={-1} key={item.id}>
                                                <TableCell className="MuiTableCell-freeze">{item.title}</TableCell>
                                                <TableCell>{item.content}</TableCell>
                                                <TableCell>{`${item.fullAddressName}, ${item.streetName}, ${item.communeName}`}</TableCell>
                                                <TableCell>{item?.userHandlerName}</TableCell>
                                                <TableCell>{item.reflectionStatusName}</TableCell>
                                                <TableCell>{item.createdBy}</TableCell>
                                                <TableCell>{dateformat(item.createdDate, "dd-mm-yyyy")}</TableCell>

                                                <TableCell>
                                                    <Tooltip hidden={item.reflectionStatusId === 3} title={item.reflectionStatusId === 2 ? 'Xử lý' : 'Đã Xử lý'}>
                                                        <IconButton
                                                            aria-label="edit"
                                                            disabled={item.reflectionStatusId === 3}
                                                            onClick={() => handleOpenFormHandle(item.id)}
                                                        >
                                                            <DragHandleIcon className={item.reflectionStatusId === 2 ? 'text-primary' : 'text-secondary'} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Xóa">
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => handleOpenDelete(item.id)}
                                                        >
                                                            <DeleteIcon className="text-danger" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                })} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {pagination.totalItemCount && pagination.totalItemCount > 0 ? (
                            <FooterPagination
                                showFirstLastButton
                                currentPage={pagination.pageIndex}
                                totalPage={pagination.pageCount}
                                totalItemCount={pagination.totalItemCount}
                                pageLimit={pagination.pageSize}
                            />
                        ) : (
                            ''
                        )}
                    </Paper>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    isLoading: state.app.loading,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            showLoading: appActions.ShowLoading,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MoodsManagement);