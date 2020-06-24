<template>
    <div class="row" v-if="portfolioList.length===0">
        <div class="col-sm-12">
            <div class="alert alert-info" role="alert">
                No stocks bought yet
            </div> 
        </div>
    </div>
    <div class="row mx-2" v-else>
        <div class="col-sm-6 my-2" v-for="(stock, index) in portfolioList" :key="index">
            <stock :name="stock.name" :price="stock.price" :boughtQuantity="stock.boughtQuantity" :isPortfolio="true"  v-if="stock.addedToPortfolio">
                <input class="form-control mr-sm-2" placeholder="Quantity" aria-label="Quantity" type="number" v-model="stock.quantity">
                <button class="btn btn-danger my-2 my-sm-0" @click.prevent="sellStock(stock, index)" :disabled="stock.quantity==undefined || stock.quantity<=0">Sell</button>
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
        data: function() {
            return {
                portfolioList: []
            };
        },
        computed: {
            ...mapGetters([
                'getFunds',
                'getStockList'
            ]),
        },
        methods: {
            ...mapActions([
                    'saveState'
                ]),
            sellStock: function(stock, index) {
                if (stock.quantity > stock.boughtQuantity) {
                    alert('Quantity too big.');
                } else {
                    const totalToPay = stock.quantity * stock.price;
                    const currentFunds = this.getFunds + totalToPay;
                    this.$store.commit('setFunds', currentFunds);

                    stock.boughtQuantity -= stock.quantity;

                    if (stock.boughtQuantity === 0) {
                        stock.addedToPortfolio = false;
                        this.portfolioList.splice(index, 1);
                    }

                    stock.quantity = undefined;
                    this.saveState();

                    /* const portfolioElement = this.getPortfolioList.find(x => x.name === this.name);
                    const stocksElement = this.getStockList.find(x => x.name === this.name);

                    portfolioElement.boughtQuantity = this.boughtQuantity - this.quantity;

                    if (portfolioElement.boughtQuantity === 0) {
                        this.getPortfolioList.splice(this.getPortfolioList.indexOf(portfolioElement), 1);
                        stocksElement.boughtQuantity = 0;
                    } else {
                        stocksElement.boughtQuantity = portfolioElement.boughtQuantity;
                    } */
                }
                stock.quantity = undefined;
            },
            fillUpPortfolioList: function() {
                for (let i=0; i<this.getStockList.length; i++) {
                    if (this.getStockList[i].addedToPortfolio) {
                        this.portfolioList.push(this.getStockList[i]);
                    }
                }                
            }
        },
        created: function() {
            this.fillUpPortfolioList();
        }
    }
</script>

<style>

</style>
