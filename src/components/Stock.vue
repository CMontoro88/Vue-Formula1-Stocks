<template>
    <div class="card">
        <template v-if="!isPortfolio">
            <div class="card-header alert-success">
                <strong>{{name}}</strong><span class="card-subtitle ml-2 text-muted">Price: {{price}}</span>
            </div>        
            <div class="card-body">
                <form class="form-inline my-2 my-lg-0 d-flex justify-content-between">
                    <slot></slot>
                </form>
            </div>
        </template>
        <template v-else>
            <div class="card-header alert-info">
                <strong>{{name}}</strong><span class="card-subtitle ml-2 text-muted">Price: {{price}} - Quantity: {{boughtQuantity}}</span>
            </div>        
            <div class="card-body">
                <form class="form-inline my-2 my-lg-0 d-flex justify-content-between">
                    <slot></slot>
                </form>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
    props: {
        name: String,
        price: Number,
        boughtQuantity: Number,
        isPortfolio: Boolean
    },
    data: function() {
        return {
            quantity: 0
        };
    },
    computed: {
        ...mapGetters([
            'getFunds',
            'getPortfolioList',
            'getStockList',
        ])
    },
    methods: {
        ...mapActions([
                'saveState'
            ]),
/*         buyStock() {
            this.quantity = parseInt(this.quantity, 10);
            const totalToPay = this.quantity * this.price;
            if (this.getFunds < totalToPay) {
                alert('Not enough funds.');
            } else {
                const currentFunds = this.getFunds - totalToPay;
                this.$store.commit('setFunds', currentFunds);
                const portfolioElement = this.getPortfolioList.find(x => x.name === this.name);
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
                }
            }
            this.quantity = 0;
            this.saveState();
        }, */
        sellStock() {
            if (this.quantity > this.boughtQuantity) {
                alert('Quantity too big.');
            } else {
                const totalToPay = this.quantity * this.price;
                const currentFunds = this.getFunds + totalToPay;
                this.$store.commit('setFunds', currentFunds);

                const portfolioElement = this.getPortfolioList.find(x => x.name === this.name);
                const stocksElement = this.getStockList.find(x => x.name === this.name);

                portfolioElement.boughtQuantity = this.boughtQuantity - this.quantity;

                if (portfolioElement.boughtQuantity === 0) {
                    this.getPortfolioList.splice(this.getPortfolioList.indexOf(portfolioElement), 1);
                    stocksElement.boughtQuantity = 0;
                } else {
                    stocksElement.boughtQuantity = portfolioElement.boughtQuantity;
                }
            }
            this.quantity = 0;
            this.saveState();
        }
    }
}
</script>

<style scoped>

</style>