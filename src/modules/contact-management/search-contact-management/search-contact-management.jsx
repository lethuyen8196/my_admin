import React from "react";
import "date-fns";
import { useForm } from "react-hook-form";

//--- Material Control
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Popover from "@material-ui/core/Popover";

//--- Material Icon
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import RefreshIcon from "@material-ui/icons/Refresh";

function SearchContactManager(props) {
  const {
    getListContactModels,
    setName,
    setSendFrom,
    rowsPerPageCommon,
    setPage,
    name,
    sendFrom,
    setOrderBy,
    setOrder,
    orderBy,
    order,
  } = props;

  const { register, handleSubmit } = useForm({
    mode: "all",
    reValidateMode: "onBlur",
  });

  const [filterSection, setFilterSection] = React.useState(null);

  const handleClickFilter = (event) => {
    setFilterSection(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilterSection(null);
  };

  const onSubmit = async (data) => {
    setPage(0);
    await getListContactModels(
      1,
      rowsPerPageCommon,
      orderBy + " " + order,
      data.name,
      data.sendFrom
    );
    handleCloseFilter();
  };

  const refresh = () => {
    setName("");
    setSendFrom("");
    setOrderBy("sentDate");
    setOrder("desc");
    let sortExpression = "sentDate desc";
    getListContactModels(1, rowsPerPageCommon, sortExpression, "", "");
  };

  const handleClearAllField = () => {
    setName("");
    setSendFrom("");
  };

  const openFilter = Boolean(filterSection);
  const idFilter = openFilter ? "popoverSlider" : undefined;

  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-3">
      <div className="d-sm-flex align-items-center justify-content-between mb-3">
        <h1 className="h3 mb-0 text-gray-800">
         
          <Tooltip title="Tìm kiếm">
            <Fab
              color="primary"
              aria-label="filter"
              size="small"
              onClick={handleClickFilter}
              className="ml-2"
            >
              <FilterListIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Refresh">
            <Fab
              color="primary"
              aria-label="filter"
              size="small"
              onClick={refresh}
              className="ml-2"
            >
              <RefreshIcon />
            </Fab>
          </Tooltip>
          <Popover
            id={idFilter}
            open={openFilter}
            anchorEl={filterSection}
            onClose={handleCloseFilter}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className="p-3 popover-admin-search">
              <div className="text-right border-bottom mb-3 pb-2">
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={handleCloseFilter}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
              <form id="formSearch" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="text-dark">Tên liên hệ</label>
                  <TextField
                    fullWidth
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    inputRef={register}
                  />
                </div>

                <div className="form-group">
                  <label className="text-dark">Người gửi</label>
                  <TextField
                    className="w-100"
                    name="sendFrom"
                    value={sendFrom}
                    onChange={(e) => {
                      setSendFrom(e.target.value);
                    }}
                    inputRef={register}
                  />
                </div>

                <div className="border-top">
                  <div className="row">
                    <div className="col-12 text-right mt-3">
                      <Button variant="contained" color="primary" type="submit">
                        <SearchIcon fontSize="small" /> Tìm kiếm
                      </Button>
                      <Button
                        variant="contained"
                        className="ml-2"
                        onClick={handleClearAllField}
                      >
                        <ClearAllIcon fontSize="small" /> Bỏ lọc
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Popover>
        </h1>
      </div>
    </div>
  );
}

export default SearchContactManager;
