import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Pagination, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ProductsPage() {
    const [productsDataList, setProductsDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [companyName, setCompanyName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [top, setTop] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const itemsPerPage = 9;

    //This is the pagination logic 
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = productsDataList.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'https://json-server-c67opnddza-el.a.run.app';

                if (companyName) url += `/companies/${companyName}`;
                if (categoryName) url += `/categories/${categoryName}`;
                url += '/products';

                // I have created a parameter oject for the url
                const params = {};
                if (top) params.top = top;
                if (minPrice) params.minPrice = minPrice;
                if (maxPrice) params.maxPrice = maxPrice;
                if (availability) params.availability = availability;

                const response = await axios.get(url, { params });
                setProductsDataList(response.data);

            }
            
            catch (error) {
                console.error("Error fetching the data", error);
            }
        };

        fetchData();
    }, [companyName, categoryName, top, minPrice, maxPrice, availability]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };



    const handleFilterChange = (filter, value) => {
        switch (filter) {
            case 'companyName':
                setCompanyName(value);
                break;
            case 'categoryName':
                setCategoryName(value);
                break;
            case 'top':
                setTop(value);
                break;
            case 'minPrice':
                setMinPrice(value);
                break;
            case 'maxPrice':
                setMaxPrice(value);
                break;
            case 'availability':
                setAvailability(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div style={{ marginBottom: '20px' }}>

                <FormControl style={{ marginRight: '10px', minWidth: 120 }}>
                    <InputLabel>Company</InputLabel>
                    <Select value={companyName} onChange={(e) => handleFilterChange('companyName', e.target.value)}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="AMZ">AMZ</MenuItem>
                        <MenuItem value="FLP">FLP</MenuItem>
                        <MenuItem value="SNP">SNP</MenuItem>
                    </Select>
                </FormControl>


                <FormControl style={{ marginRight: '10px', minWidth: 120 }}>
                    <InputLabel>Category</InputLabel>
                    <Select 
                        value={categoryName} 
                        onChange={
                            (e) => handleFilterChange('categoryName', e.target.value)
                        }>

                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="Laptop">Laptop</MenuItem>
                        <MenuItem value="Phone">Phone</MenuItem>
                        <MenuItem value="Computer">Computer</MenuItem>
                        <MenuItem value="TV">TV</MenuItem>
                        <MenuItem value="Pendrive">Pendrive</MenuItem>
                    </Select>


                </FormControl>

                <TextField 
                    label="Top N Products" 
                    variant="outlined" 
                    type="number" 
                    value={top} 
                    onChange={
                        (e) => handleFilterChange('top', e.target.value)
                        } 
                    style={{ marginRight: '10px' }} 
                />
                
                <TextField 
                    label="Min Price" 
                    variant="outlined" 
                    type="number" 
                    value={minPrice} 
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)} style={{ marginRight: '10px' }} 
                />


                <TextField 
                    label="Max Price" 
                    variant="outlined" 
                    type="number" 
                    value={maxPrice} 
                    onChange={
                        (e) => handleFilterChange('maxPrice', e.target.value)} style={{ marginRight: '10px' }
                    } 
                />


                <FormControl style={{ marginRight: '10px', minWidth: 120 }}>
                    <InputLabel>Availability</InputLabel>
                    <Select 
                        value={availability} 
                        onChange={
                            (e) => handleFilterChange('availability', e.target.value)
                        }>
                    

                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>

                    </Select>
                </FormControl>

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setCurrentPage(1)} 
                    style={{ marginLeft: '10px' }}>
                    Apply Filters
                    


                    
                </Button>

            </div>
            <Grid container spacing={4}>
                {currentProducts.map((product, idx) => (
                    <Grid item xs={6} md={4} key={idx}>
                        <Item>
                            <h2>{product.productName}</h2>
                            <p>Company: {product.company}</p>
                            <p>Discount: {product.discount}%</p>
                            <p>Price: ${product.price}</p>
                            <p>Rating: {product.rating} stars</p>
                        </Item>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(productsDataList.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </>
    );
}

export default ProductsPage;
