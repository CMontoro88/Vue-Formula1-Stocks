<template>
    <div class="row mx-2">
        <div class="col-sm-6 my-2" v-for="(stock, index) in getStockList" :key="index">
            <stock :name="stock.name" :price="stock.price" :boughtQuantity="stock.boughtQuantity" :addedToPortfolio="stock.addedToPortfolio" :isPortfolio="false">
                <input class="form-control mr-sm-2" placeholder="Quantity" aria-label="Quantity" type="number" v-model="stock.quantity">
                <button class="btn btn-success my-2 my-sm-0" @click.prevent="buyStock(stock)" :disabled="stock.quantity==undefined || stock.quantity<=0">Buy</button>
            </stock>
        </div>     
    </div>
</template>

<script>
    import Stock from './Stock'
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
        components: {
            'stock': Stock
        },
        computed: {
            ...mapGetters([
                'getFunds',
                'getStockList'
            ])
        },
        methods: {
            ...mapActions([
                    'saveState'
                ]),
            buyStock: function(stock) {
                stock.quantity = parseInt(stock.quantity, 10);
                const totalToPay = stock.quantity * stock.price;
                if (this.getFunds < totalToPay) {
                    alert('Not enough funds.');
                } else {
                    const currentFunds = this.getFunds - totalToPay;
                    this.$store.commit('setFunds', currentFunds);

                    if (stock.addedToPortfolio){ 
                        stock.boughtQuantity += stock.quantity;
                    } else {
                        stock.addedToPortfolio = true;
                        stock.boughtQuantity = stock.quantity;
                    }

                    /* const portfolioElement = this.getPortfolioList.find(x => x.name === this.name);
                    const stocksElement = this.getStockList.find(x => x.name === this.name);
                    if (portfolioElement) {
                        console.log(portfolioElement);
                        portfolioElement.boughtQuantity = this.boughtQuantity + this.quantity;
                        stocksElement.boughtQuantity = this.boughtQuantity + this.quantity;
                    } else {
                        const newStockPortfolio = {
                            'name': this.name,
                            'price': this.price,
                            'boughtQuantity': this.quantity
                        };
                        const porfolioList = this.getPortfolioList;
                        porfolioList.push(newStockPortfolio);
                        this.$store.commit('setPortfolioList', porfolioList);
                        stocksElement.boughtQuantity = this.quantity;
                    } */
                }
                delete stock.quantity;
                this.saveState();
            }
        },
        created: function() {
        }
    }
</script>

<style>
</style>
