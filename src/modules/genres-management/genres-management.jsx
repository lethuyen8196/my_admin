import React, { useState, useEffect } from "react";
import * as appActions from "../../core/app.store";
import * as genresAction from "../../redux/store/genres/genres.store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListGenres from "./list-genres";
import Filter from "../../components/filter/filter.view";
import DeleteDialog from "../../components/dialog-delete/dialog-delete.view";
import FooterPagination from "../../components/footer-pagination/pagination";
import { useLocation } from 'react-router-dom';
import history from "../../common/history";
import ShowNotification from "../../components/react-notifications/react-notifications";
import { NotificationMessageType } from "../../utils/configuration";
import * as viVN from "../../language/vi-VN.json";

//--- Material Icon
import AddCircle from "@material-ui/icons/AddCircle";

const GenresManagement = (props) => {
    const { showLoading } = props;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [data, setData] = useState([]);
    const [orderBy, setOrderBy] = useState('modifiedDate');
    const [order, setOrder] = useState('desc');
    const pageIndex = 1;
    const pageSize = 10;
    const [pagination, setPagination] = useState({});
    const [selectedId, setSelectedId] = useState(0);
    //--- Dialog
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        getData();
    }, [location.search])

    const getData = () => {
        let params = getParamsFromQuery();
        GetListAll(params);
    }

    const getParamsFromQuery = () => {
        return {
            pageSize: queryParams.get("pageSize") || pageSize,
            pageIndex: queryParams.get("pageIndex") || pageIndex,
            sorting: queryParams.get("sorting"),
            name: queryParams.get("name"),
        }
    }

    const GetListAll = (params) => {
        showLoading(true);
        genresAction.GetAll(params).then(res => {
            if (res && res.content) {
                const { items, pageCount, pageIndex, pageSize, totalItemCount } = res.content || {};
                setData(items);
                setPagination({ ...pagination, pageCount, pageIndex, pageSize, totalItemCount });
            }
            showLoading(false);
        }).catch(err => {
            showLoading(false);
            console.log(err);
        })
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

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleOpenEditDialog = (id) => {
        setSelectedId(id);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleOpenDeleteDialog = (id) => {
        setSelectedId(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDelete = () => {
        showLoading(true);
        genresAction.DeleteGenres(selectedId)
            .then(res => {
                if (res) {
                    getData();
                    handleCloseDeleteDialog();
                    ShowNotification(
                        viVN.Success.DeleteSuccess,
                        NotificationMessageType.Success
                    );
                }
                showLoading(false);
            }).catch(err => {
                handleCloseDeleteDialog();
                showLoading(false);
                err &&
                    err.errorType &&
                    ShowNotification(
                        err.errorMessage,
                        NotificationMessageType.Error
                    );
            })

    }


    return (
        <div className="position-relative">
            <div className="btn_add">
                <span className="">
                    <AddCircle className="mr-1" />
                    Add new
                </span>
            </div>
            <div className="filter mb-3">
                <Filter
                    hasName
                />
            </div>
            <ListGenres
                data={data}
                createSortHandler={createSortHandler}
                order={order}
                orderBy={orderBy}
                deleteAction={handleOpenDeleteDialog}
                editAction={handleOpenEditDialog}
            />
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
            {openDeleteDialog && (
                <DeleteDialog
                    isOpen={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onSuccess={handleDelete}
                    header={"Xác nhận xóa"}
                    content={"Bạn có chắc chắn muốn xóa?"}
                />
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(GenresManagement);