<template>
    <div id="shippingOrder">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex lg12>
                    <v-toolbar card color="white">
                        <v-text-field
                            flat
                            solo
                            prepend-icon="search"
                            placeholder="Buscar..."
                            v-model="search"
                            hide-details
                            class="hidden-sm-and-down">
                        </v-text-field>  
                        <v-btn color="success" @click="create()" flat>
                            <i class="fa fa-plus"></i>&nbsp;
                            Crear
                        </v-btn>         
                    </v-toolbar>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            search: '',
            snackbar: {
                show: false,
                text: '',
                color: '',
                icon: ''
            },
        }
    },
    methods: {
        create(){
            this.$router.push({ path: '/ordenes-de-envios/crear' })
        }
    }
}
</script>