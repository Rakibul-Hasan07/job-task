import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, FormControl, MenuItem, InputLabel, Select, Grid, Typography } from '@mui/material'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AlignHorizontalLeftOutlinedIcon from '@mui/icons-material/AlignHorizontalLeftOutlined';
import TaskIcon from '@mui/icons-material/Task';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetFormDataQuery, usePostFormDataMutation } from '../features/form/formSlice';
import { format } from 'date-fns';
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';

const Form = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetFormDataQuery();
    const [postFormData, { isSuccess, isError }] = usePostFormDataMutation();
    const [datas, setDatas] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const { register, handleSubmit, reset } = useForm()


    useEffect(() => {
        if (data && data.length > 0) {
            const dataItem = data[0];
            setDatas(dataItem);
        }
    }, [data]);

    const { style, poNo, country, color, size, line } = datas;

    const handleDateChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setSelectedDate(date);
        }
    };
    const formFormatDate = selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : '';

    const onSubmit = (data) => {
        data.date = formFormatDate;
        postFormData(data)
    }
    useEffect(() => {
        if (isLoading) {
            toast.loading("Posting...", { id: "addFormData" })
        }
        if (isSuccess) {
            toast.success("Save Successfully", { id: "addFormData" })
            reset();
        }
        if (isError) {
            toast.error("Somthing went wrong...", { id: "addFormData" })
            reset();
        }
    }, [isLoading, isSuccess, reset, isError])

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <Box sx={{ border: 1, padding: 1, margin: 1, borderColor: 'success.main' }}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Box>
                        <Box sx={{ display: 'flex', padding: '3px', alignItems: 'center', backgroundColor: theme.palette.primary.main, color: 'white' }}>
                            <FormatListBulletedOutlinedIcon />
                            <Typography style={{ marginLeft: theme.spacing(1), textTransform: 'uppercase' }}>Input Sewing Production Data</Typography>
                        </Box>
                        <Box sx={{ borderLeft: '1px dashed black', borderRight: '1px dashed black', borderBottom: '1px dashed black', padding: 1 }}>
                            <Grid container spacing={1} sx={{ marginTop: 3, marginBottom: 1 }}>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel required>Style</InputLabel>

                                            <Select
                                                label="Style"
                                                name='style'
                                                {...register("style")}
                                            >
                                                {
                                                    style?.map((sty, idx) => <MenuItem key={idx} defaultValue="" value={sty}>{sty}</MenuItem>)
                                                }

                                            </Select>

                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel required>PO NO</InputLabel>
                                            <Select
                                                label="PO NO"
                                                name='poNo'
                                                {...register("poNo")}
                                            >
                                                {
                                                    poNo?.map((po, idx) => <MenuItem key={idx} defaultValue="" value={po}>{po}</MenuItem>)
                                                }

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel required>Country</InputLabel>
                                            <Select
                                                label="Country"
                                                name='country'
                                                {...register("country")}
                                            >
                                                {
                                                    country?.map((cty, idx) => <MenuItem key={idx} defaultValue="" value={cty}>{cty}</MenuItem>)
                                                }

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel required>Color</InputLabel>
                                            <Select
                                                name='color'
                                                {...register("color")}
                                            >
                                                {
                                                    color?.map((clr, idx) => <MenuItem key={idx} defaultValue="" value={clr}>{clr}</MenuItem>)
                                                }

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel required>Line</InputLabel>
                                            <Select
                                                label="Line"
                                                name='line'
                                                {...register("line")}
                                            >
                                                {
                                                    line?.map((lne, idx) => <MenuItem key={idx} defaultValue="" value={lne}>{lne}</MenuItem>)
                                                }

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <TextField  {...register("hour")} variant='outlined' defaultValue="" type='number' name='hour' label="Hour" required></TextField>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    required
                                                    label='Date *'
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                        <Box sx={{ display: 'flex', padding: '3px', alignItems: 'center', backgroundColor: theme.palette.primary.main, color: 'white' }}>
                            <FormatListBulletedOutlinedIcon />
                            <Typography style={{ marginLeft: theme.spacing(1), textTransform: 'uppercase' }}>size info</Typography>
                        </Box>
                        <Box sx={{ borderLeft: '1px dashed black', borderRight: '1px dashed black', borderBottom: '1px dashed black', padding: 1 }}>
                            <Grid container spacing={1} sx={{ marginTop: 3, marginBottom: 1 }}>
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel required>Size</InputLabel>
                                            <Select
                                                label='Size'
                                                name='size'
                                                {...register("size")}
                                            >
                                                {
                                                    size?.map((sze, idx) => <MenuItem key={idx} defaultValue="" value={sze}>{sze}</MenuItem>)
                                                }

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <TextField  {...register("sewingQty")} defaultValue="" variant='outlined' type='number' name='sewingQty' label="Sewing Qty" required></TextField>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <TextField  {...register("totalOrderQty")} defaultValue="" variant='outlined' type='number' name='totalOrderQty' label="Total Order Qty"></TextField>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <TextField  {...register("totalInputQty")} defaultValue="" variant='outlined' type='number' name='totalInputQty' label="Total Input Qty"></TextField>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <TextField  {...register("totalProductionQty")} defaultValue="" variant='outlined' type='number' name='totalProductionQty' label="Total Production Qty"></TextField>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <TextField  {...register("totalBalanceQty")} defaultValue="" variant='outlined' type='number' name='totalBalanceQty' label="Total Balance Qty"></TextField>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                        <Box sx={{ border: '1px dashed black', padding: 1 }}>
                            <Grid container spacing={1} justifyContent="end">
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Button variant='contained' color='success' type='button' sx={{ width: '100%' }}>
                                        <AlignHorizontalLeftOutlinedIcon fontSize='small' sx={{ marginRight: 1 }} /> Style ship out
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Button variant='contained' color='primary' type='button' sx={{ width: '100%' }}>
                                        <TaskIcon fontSize='small' sx={{ marginRight: 1, color: 'red' }} /> Report
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} lg={2}>
                                    <Button variant='contained' color='success' type='submit' sx={{ width: '100%' }}>
                                        <CheckCircleOutlinedIcon fontSize='small' sx={{ marginRight: 1 }} /> Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </form>
            </Box>
        </div>
    );
};

export default Form;