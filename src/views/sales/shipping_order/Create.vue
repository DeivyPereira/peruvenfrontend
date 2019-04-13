<template>
    <div id="createShippOrder">
        <v-container grid-list-md>
            <v-stepper v-model="e1">
            
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">Modalidad</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2">Origen</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 3" step="3">Destino</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 4" step="4">Detalles</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="5">Confirmar</v-stepper-step>
                    <v-divider></v-divider>
                </v-stepper-header>

                <v-stepper-items>

                    <v-stepper-content step="1">
                        <v-layout wrap>                        
                            <v-flex lg6 md6 sm12 xs12>
                                <v-text-field
                                    v-model="form.details.tracking"
                                    disabled
                                    label="Tracking">
                                </v-text-field>
                            </v-flex>
                            <v-flex lg6 md6 sm12 xs12>
                                <div style="margin: 0 auto; width: 90%; text-align: center"> 
                                    <v-label>
                                        ¿Carga asegurada?
                                    </v-label>
                                    <v-radio-group v-model="ensurance" row>
                                        <v-radio
                                            v-for="item in basic.ensurance"
                                            :key="item.value"
                                            :label="item.text"
                                            :value="item.value"
                                        ></v-radio>
                                    </v-radio-group>
                                </div>
                            </v-flex>
                            <v-flex sm12 md12 lg12>
                                <v-label>Asignar impuestos</v-label>
                                <v-layout wrap>
                                    <v-flex sm6 md4 lg4
                                        v-for="items in basic.taxes" 
                                        :key="items.id">
                                        <v-checkbox 
                                            v-model="taxes" 
                                            :label="items.name + ' - ' + items.value + ' %'"
                                            :value="items.id">
                                        </v-checkbox>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex sm12 md6 lg6>
                                <v-label>Selecciona la modalidad:</v-label>
                                <v-radio-group v-model="modality" row>
                                    <v-radio
                                        v-for="item in basic.modality"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value"
                                    ></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex sm12 md6 lg6 style="text-align: center">
                                <v-btn color="info" @click="dialog.selectPackage = true">
                                    Asignar a fecha de salida
                                </v-btn>
                                <h4 v-if="form.package.package_id != ''">Fecha de salida: {{ form.details.out_date }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout wrap>
                            <v-flex lg6 md6 sm12 xs12>
                                <v-btn flat disabled>
                                    Regresar
                                </v-btn>
                                <v-btn color="primary" @click="e1 = 2" :disabled="disabledBtn.modality">
                                    Continuar
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-form 
                        ref="clientForm"
                        lazy-validation>
                            <v-layout wrap row>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                    @keyup="blurValidate()"
                                    v-model="form.client.shipper"
                                    :rules="onlyText"
                                    :disabled="disabled.clientField"
                                    label="Remitente"></v-text-field>
                                </v-flex>
                                <v-flex lg2 md2 sm12 xs12>
                                    <v-select
                                        @input="blurValidate()"
                                        label="Documento"
                                        :items="basic.doc_types"
                                        v-model="form.client.doc_type"
                                        item-text="text"
                                        item-value="value"
                                        :disabled="disabled.clientField"
                                        :rules="[v => !!v || 'Campo requerido']">
                                    </v-select>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidate()"
                                        label="Número"
                                        v-model="form.client.number"
                                        :disabled="disabled.clientField"
                                        :rules="[v => !!v || 'Campo requerido']">
                                    </v-text-field>
                                </v-flex>

                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidate()"
                                        :rules="onlyText"
                                        v-model="form.client.contact_person"
                                        label="Persona de Contacto">
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidate()"
                                        :rules="[v => !!v || 'Campo requerido']" 
                                        v-model="form.client.phone"
                                        label="Número Telefónico">
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidate()"
                                        v-model="form.client.email"
                                        label="Correo Electrónico">
                                    </v-text-field>
                                </v-flex>

                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field   
                                        @keyup="blurValidate()"
                                        v-model="form.client.address"
                                        label="Dirección">
                                    </v-text-field>
                                </v-flex>

                                <v-flex lg6 md6 sm12 xs12>
                                    <v-select
                                        @input="blurValidate(); getCurrencies()"
                                        label="País"
                                        :items="basic.countries"
                                        v-model="form.client.country"
                                        item-text="label"
                                        item-value="value"
                                        :rules="[v => !!v || 'Campo requerido']">
                                    </v-select>
                                </v-flex>

                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidate()"
                                        v-model="form.client.city"
                                        :rules="onlyText"
                                        label="Ciudad">
                                    </v-text-field>
                                </v-flex>

                            </v-layout>

                            <v-layout>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-btn flat @click="e1 = 1">
                                        Regresar
                                    </v-btn>
                                    <v-btn color="primary" :disabled="disabledBtn.firsStep" @click="e1 = 3">
                                        Continuar
                                    </v-btn>
                                    <v-btn color="error" @click="resetClientFields()" v-if="disabled.clientField">
                                        Restablecer
                                    </v-btn>
                                </v-flex>
                                <v-flex lg3 md3 sm12 xs12 style="text-align: right">
                                    <v-btn color="success" flat @click="dialog.searchClient = true">
                                        <i class="fa fa-search"></i>&nbsp;
                                        Buscar Cliente 
                                    </v-btn>
                                </v-flex>
                            </v-layout>

                        </v-form>
                        
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-form
                        ref="addAfiliateForm">
                            <v-layout wrap row>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                    :rules="onlyText"
                                    @keyup="blurValidateAfiliate()"
                                    :disabled="disabled.afiliateField"
                                    v-model="form.afiliates.destination_name"
                                    label="Destinatario"></v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                    @keyup="blurValidateAfiliate()"
                                    v-model="form.afiliates.attention"
                                    :rules="onlyText"
                                    label="Atención"></v-text-field>
                                </v-flex>
                                <v-flex md2 lg2 sm4 xs4>
                                    <v-select
                                        @input="blurValidateAfiliate()"
                                        label="Documento"
                                        :items="basic.doc_types"
                                        v-model="form.afiliates.doc_type"
                                        item-text="text"
                                        item-value="value"
                                        :disabled="disabled.afiliateField"
                                        :rules="[v => !!v || 'Campo requerido']">
                                    </v-select>
                                </v-flex>
                                <v-flex md4 lg4 sm9 xs9>
                                    <v-text-field
                                    @keyup="blurValidateAfiliate()"
                                    :disabled="disabled.afiliateField"
                                    v-model="form.afiliates.number"
                                    :rules="onlyText"
                                    label="Número"></v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                    @keyup="blurValidateAfiliate()"
                                    v-model="form.afiliates.address"
                                    :rules="onlyText"
                                    label="Dirección"></v-text-field>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-select
                                        @input="blurValidateAfiliate(); getCurrencies()"
                                        label="País"
                                        :rules="[v => !!v || 'Campo requerido']"
                                        :items="basic.countries"
                                        v-model="form.afiliates.country"
                                        item-text="label"
                                        item-value="value">
                                    </v-select>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                    @keyup="blurValidateAfiliate()"
                                    v-model="form.afiliates.city"
                                    :rules="onlyText"
                                    label="Ciudad"></v-text-field>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidateAfiliate()"
                                        v-model="form.afiliates.phone"
                                        :rules="[v => !!v || 'Campo requerido']"
                                        label="Número telefónico">
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                    @keyup="blurValidateAfiliate()"
                                    v-model="form.afiliates.email"
                                    label="Correo Electrónico"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-btn flat @click="e1 = 2">
                                        Regresar
                                    </v-btn>
                                    <v-btn color="primary" 
                                        :disabled="disabledBtn.secondStep" 
                                        @click="e1 = 4; getCurrencies(); getTaxesSelected()">
                                        Continuar
                                    </v-btn>
                                    <v-btn color="error" @click="resetAfiliateFields()" v-if="disabled.afiliateField">
                                        Restablecer
                                    </v-btn>
                                </v-flex>
                                
                                <v-flex lg3 md3 sm12 xs12 style="text-align: right">
                                    <v-btn color="success" v-if="form.client.id !== null" @click="dialog.searchAfiliate = true; getAfiliated()" flat>
                                        <i class="fa fa-search"></i>&nbsp;
                                        Buscar Afiliados 
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-form ref="addOrderForm">
                            <v-layout wrap>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-select
                                        label="Seleccione moneda de pago"
                                        :items="basic.money"
                                        v-model="form.details.currency"
                                        @input="blurValidateOrder()"
                                        item-text="money"
                                        item-value="money">
                                    </v-select>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                        @blur="blurValidateOrder()"
                                        @keyup="blurValidateOrder()"
                                        :rules="onlyText"
                                        v-model="form.details.out_date"
                                        label="Fecha de salida"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Paquete N°</th>
                                            <th>Descripción del bien</th>
                                            <th>Categorización</th>
                                            <th>Costo del producto</th>
                                            <th>Porcentaje por seguro</th>
                                            <th>Unidades</th>
                                            <th>Costo Unitario</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="( items, index ) in form.products">
                                            <td>{{ items.package }}</td>
                                            <td>{{ items.description }}</td>
                                            
                                            <td>
                                                {{ items.category_name }}<br>
                                                <small>{{ items.subcategory_name }}</small>
                                            </td>

                                            <td v-if="items.product_price != undefined">
                                                {{ items.product_price }} {{ form.details.currency }}
                                            </td>

                                            <td v-if="form.details.ensurance == 0">NO ASEGURADO</td>
                                            <td v-if="form.details.ensurance == 1">{{ items.ensurance_value }} %</td>

                                            <td v-if="items.weight == ''">{{ items.qty }} Und</td>
                                            <td v-if="items.weight != ''">{{ items.weight }} Kg</td>
                                            
                                            <td v-if="items.weight == ''">{{ items.subtotal }} {{ form.details.currency }}</td>
                                            <td v-if="items.weight != ''">{{ items.kilo_value }} {{ form.details.currency }}</td>

                                            <td>{{ items.price }} {{ form.details.currency }}</td>
                                            <td style="text-align: right">
                                                <v-btn 
                                                depressed 
                                                outline 
                                                icon 
                                                fab 
                                                dark 
                                                color="red" 
                                                small
                                                @click="removeProduct( index )">
                                                    <v-icon>fa fa-times</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>

                                        <tr v-if="form.products.length > 0">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                <strong>
                                                    Impuestos:
                                                </strong>
                                            </td>
                                            <td style="background: rgb( 230,230,230 );"></td>
                                            <td style="background: rgb( 230,230,230 );"></td>
                                        </tr>

                                        <tr v-for="items in taxesSelected">
                                            <td v-if="form.products.length > 0"></td>
                                            <td v-if="form.products.length > 0"></td>
                                            <td v-if="form.products.length > 0"></td>
                                            <td v-if="form.products.length > 0"></td>
                                            <td v-if="form.products.length > 0"></td>
                                            <td style="text-align: right" v-if="form.products.length > 0">
                                                <strong>
                                                    {{ items.name }}:
                                                </strong>
                                            </td>
                                            <td v-if="form.products.length > 0" style="text-align: right">
                                                {{ items.value }}
                                            </td>
                                            <td v-if="form.products.length > 0">
                                                %
                                            </td>
                                        </tr> 

                                        <tr v-if="form.products.length > 0">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                <strong>
                                                    Total:
                                                </strong>
                                            </td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                {{ form.total }}
                                            </td>
                                            <td style="background: rgb( 230,230,230 );">
                                                {{ form.details.currency }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-if="form.products.length === 0" style="text-align: center; padding: 1rem">
                                    <h4>
                                        <i class="fa fa-exclamation-circle"></i>&nbsp;
                                        Debe agregar productos a esta encomienda
                                    </h4>
                                </div>
                            </div>


                            <v-layout wrap>
                                <v-flex lg12 md12 sm12 xs12>
                                    <v-textarea
                                    @blur="blurValidateOrder()"
                                    @keyup="blurValidateOrder()"
                                    :rules="onlyText"
                                    v-model="form.details.reason"
                                    label="Razón de exportación"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>

                            <v-layout>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-btn flat @click="e1 = 3">
                                        Regresar
                                    </v-btn>

                                    <v-btn color="primary" :disabled="disabled.orderform" @click="e1 = 5">
                                        Continuar
                                    </v-btn>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12 style="text-align: right">
                                    <v-btn color="success" 
                                        @click="openAddProduct()" 
                                        flat>
                                        <i class="fa fa-plus"></i>&nbsp;
                                        Agregar Producto 
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-stepper-content>

                    <v-stepper-content step="5">
                        <v-layout wrap>
                            <v-flex lg12 md12 sm12>
                                <h4 v-if="modality == 1">Pago en el Origen</h4>
                                <h4 v-if="modality == 2">Cobro en Destino</h4>
                            </v-flex>
                            <v-flex lg6 md6 sm12>
                                <h4>Origen</h4>
                                <strong>Remitente:</strong>&nbsp;
                                {{ form.client.shipper }}<br>
                                <strong>Persona de Contacto:</strong>&nbsp;
                                {{ form.client.contact_person }}<br>
                                <strong>Dirección:</strong>&nbsp;
                                {{ form.client.address }}<br>
                                <strong>País:</strong>&nbsp;
                                {{ form.client.country }}<br>
                                <strong>Ciudad:</strong>&nbsp;
                                {{ form.client.city }}<br>
                                <strong>Teléfono:</strong>&nbsp;
                                {{ form.client.phone }}<br>
                                <strong>Correo Electrónico:</strong>&nbsp;
                                {{ form.client.email }}<br>
                                <strong>Fecha de salida</strong>&nbsp;
                                {{ form.details.out_date }}<br>
                            </v-flex>
                            <v-flex lg6 md6 sm12>
                                <h4>Destino</h4>
                                <strong>Destinatario:</strong>&nbsp;
                                {{ form.afiliates.destination_name }}<br>
                                <strong>Atención:</strong>&nbsp;
                                {{ form.afiliates.attention }}<br>
                                <strong>Dirección:</strong>&nbsp;
                                {{ form.afiliates.address }}<br>
                                <strong>País:</strong>&nbsp;
                                {{ form.afiliates.country }}<br>
                                <strong>Ciudad:</strong>&nbsp;
                                {{ form.afiliates.city }}<br>
                                <strong>Teléfono:</strong>&nbsp;
                                {{ form.afiliates.phone }}<br>
                                <strong>Correo Elecrónico:</strong>&nbsp;
                                {{ form.afiliates.email }}<br>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex lg12 md12 sm12>
                                
                             <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Paquete N°</th>
                                            <th>Descripción del bien</th>
                                            <th>Categorización</th>
                                            <th>Costo del producto</th>
                                            <th>Unidades</th>
                                            <th>Costo Unitario</th>
                                            <th>Porcentaje por seguro</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="items in form.products">
                                            <td>{{ items.package }}</td>
                                            <td>{{ items.description }}</td>
                                            
                                            <td>
                                                {{ items.category_name }}<br>
                                                <small>{{ items.subcategory_name }}</small>
                                            </td>

                                            <td>{{ items.product_price }} {{ form.details.currency }}</td>

                                            <td v-if="items.weight == ''">{{ items.qty }} Und</td>
                                            <td v-if="items.weight != ''">{{ items.weight }} Kg</td>
                                            
                                            <td v-if="items.weight == ''">{{ items.subtotal }} {{ form.details.currency }}</td>
                                            <td v-if="items.weight != ''">{{ items.kilo_value }} {{ form.details.currency }}</td>
                                            
                                            <td v-if="form.details.ensurance == 0">NO ASEGURADO</td>
                                            <td v-if="form.details.ensurance == 1">{{ items.ensurance_value }} %</td>

                                            <td>{{ items.price }} {{ form.details.currency }}</td>
                                            <td></td>
                                        </tr>

                                        <tr v-if="form.products.length > 0">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                <strong>
                                                    Impuestos:
                                                </strong>
                                            </td>
                                            <td style="background: rgb( 230,230,230 );"></td>
                                            <td style="background: rgb( 230,230,230 );"></td>
                                        </tr>

                                        <tr v-for="items in taxesSelected">
                                            <td v-if="form.products.length > 0"></td>
                                            <td v-if="form.products.length > 0"></td>
                                            <td v-if="form.products.length > 0"></td>
                                            <td v-if="form.products.length > 0"></td>
                                            <td v-if="form.products.length > 0"></td>
                                            <td style="text-align: right" v-if="form.products.length > 0">
                                                <strong>
                                                    {{ items.name }}:
                                                </strong>
                                            </td>
                                            <td v-if="form.products.length > 0" style="text-align: right">
                                                {{ items.value }}
                                            </td>
                                            <td v-if="form.products.length > 0">
                                                %
                                            </td>
                                        </tr> 

                                        <tr v-if="form.products.length > 0">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                <strong>
                                                    Total:
                                                </strong>
                                            </td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                {{ form.total }}
                                            </td>
                                            <td style="background: rgb( 230,230,230 );">
                                                {{ form.details.currency }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-if="form.products.length === 0" style="text-align: center; padding: 1rem">
                                    <h4>
                                        <i class="fa fa-exclamation-circle"></i>&nbsp;
                                        Debe agregar productos a esta encomienda
                                    </h4>
                                </div>
                            </div>

                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <strong>Razón de exportación</strong><br>
                                {{ form.details.reason }}
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex lg6 md6 sm12 xs12>
                                <v-btn flat @click="e1 = 4" :disabled="disabledBtn.goBackBeforeSave">
                                    Regresar
                                </v-btn>
                                <v-btn color="primary"  @click="save()" :loading="loading.saveBtn">
                                    Generar
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>
        </v-container>

        <v-dialog v-model="dialog.searchClient" max-width="600px">
            <v-card>
                
                <v-form ref="findClientForm" @submit="validateFindClient()">
                    <v-card-title>
                        <v-layout wrap>
                            <v-flex lg10 md10 sm10 xs10>
                                <v-text-field 
                                    :loading="loading.searchClient"
                                    v-model="search.client"
                                    :rules="[v => !!v || 'Campo requerido']"
                                    label="Nombre o documento del cliente">
                                </v-text-field>
                            </v-flex>
                            <v-flex lg2 md2 sm2 xs2>
                                <button type="submit" class="search-btn">
                                    <i class="fa fa-search"></i>
                                </button>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                </v-form>

                <v-card-text>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Nombre</th>
                                    <th>Contacto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="items in request.client">
                                    <td>{{ items.doc_type | doc_typesFilter }} {{ items.number }}</td>
                                    <td>{{ items.shipper }}</td>
                                    <td>{{ items.phone }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="text-align: center; padding: 0.75rem" v-if="request.client.length == 0">
                            <h4>
                                <i class="fa fa-exclamation-circle"></i>&nbsp;
                                Realice su búsqueda  
                            </h4>
                        </div>
                    </div>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click.native="dialog.searchClient = false">
                    Cerrar
                  </v-btn>
                  <v-btn color="success" 
                    :loading="saveLoader" 
                    :disabled="disabledBtn.addClient" 
                    @click="addClient()">
                    Agregar
                  </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog 
            v-model="dialog.searchAfiliate" 
            scrollable
            max-width="600px">
            <v-card>
                <v-card-text>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="items in request.afiliates">
                                    <td>{{ items.id }} {{ items.doc_type | doc_typesFilter }} {{ items.number }}</td>
                                    <td>{{ items.destination_name }}</td>
                                    <td>{{ items.phone }}</td>
                                    <td>
                                        <v-btn 
                                            depressed outline icon fab dark color="success" small
                                            @click="addAfiliated( items.id, 
                                                                  items.doc_type, 
                                                                  items.number,
                                                                  items.destination_name, 
                                                                  items.attention,
                                                                  items.address,
                                                                  items.clients_id,
                                                                  items.country,
                                                                  items.city,
                                                                  items.phone,
                                                                  items.email )">
                                            <v-icon>fa fa-plus</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </v-card-text>
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click.native="dialog.searchAfiliate = false">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialog.addProduct" max-width="800px">
            <v-form ref="productForm">
                <v-card>
                    <v-card-title>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-flex lg6 md6 sm12 xs12>
                                    <v-select
                                        label="Tipo de Producto"
                                        v-model="productToInsert.product_type"
                                        :items="basic.product_type"
                                        @input="getKilos()"
                                        :rules="[v => !!v || 'Campo requerido']" 
                                        item-text="text"
                                        item-value="value">
                                    </v-select>
                                </v-flex>
                                
                                <v-flex lg6 md6 sm12 xs12 v-if="productToInsert.product_type == 1 || productToInsert.product_type == 3">
                                    <v-select
                                        label="Seleccionar precio por kilo"
                                        v-model="productToInsert.kilo_id"
                                        @input="getKiloCost()"
                                        :items="basic.kilos"
                                        :rules="[v => !!v || 'Campo requerido']" 
                                        item-text="name"
                                        item-value="id">
                                    </v-select>
                                </v-flex>
                                
                                
                                <v-flex lg12 md12 sm12 xs12>
                                    <v-text-field
                                    label="Descripción del bien"
                                    :rules="[v => !!v || 'Campo requerido']" 
                                    v-model="productToInsert.description"></v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-select
                                        label="Categoría"
                                        @input="getSubcategories()"
                                        :items="basic.categories"
                                        v-model="productToInsert.category"
                                        item-text="name"
                                        item-value="id">
                                    </v-select>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-select
                                        label="Sub Categoría"
                                        v-model="productToInsert.subcategory"
                                        :loading="loading.getSubcategories"
                                        :items="basic.subCategories"
                                        item-text="name"
                                        item-value="id">
                                    </v-select>
                                </v-flex>

                                <!-- Por productos -->

                                <v-flex lg3 md3 sm6 xs6 v-if="productToInsert.product_type == 2">
                                    <v-text-field
                                    label="Cantidad"
                                    :rules="onlyNumbers"
                                    @keyup="getTotalProductToInsert()"
                                    persistent-hint
                                    hint="Solo valores numéricos"
                                    v-model="productToInsert.qty"></v-text-field>
                                </v-flex>
                                <v-flex lg3 md3 sm6 xs6 v-if="productToInsert.product_type == 2">
                                    <v-text-field
                                    label="Precio Unitario"
                                    :rules="onlyNumbers"
                                    @keyup="getTotalProductToInsert()"
                                    persistent-hint
                                    hint="Solo valores numéricos"
                                    v-model="productToInsert.subtotal"></v-text-field>
                                </v-flex>
                                
                                <!-- por kilos -->

                                <v-flex lg3 md3 sm8 xs8 v-if="productToInsert.product_type == 1 || productToInsert.product_type == 3">
                                    <v-text-field
                                        label="Valor por kilo"
                                        disabled
                                        v-model="productToInsert.kilo_value">
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg3 md3 sm8 xs8 v-if="productToInsert.product_type == 1">
                                    <h4 style="margin-top: 15px; margin-bottom: 0">{{ form.details.currency }}</h4>
                                </v-flex>
                                <v-flex lg3 md3 sm12 xs12 v-if="productToInsert.product_type == 1">
                                    <v-text-field
                                    :rules="onlyNumbers" 
                                    label="Peso del ítem"
                                    @keyup="getTotalProductToInsert()"
                                    persistent-hint
                                    hint="Decimales separados por '.'"
                                    v-model="productToInsert.weight"></v-text-field>
                                </v-flex>

                                <!-- kilos volumétricos -->

                                <v-flex lg2 md2 sm12 xs12 v-if="productToInsert.product_type == 3">
                                    <v-text-field
                                    label="Alto"
                                    :rules="onlyNumbers"
                                    v-model="productToInsert.height"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex lg2 md2 sm12 xs12 v-if="productToInsert.product_type == 3">
                                    <v-text-field
                                    label="Ancho"
                                    :rules="onlyNumbers"
                                    v-model="productToInsert.width"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex lg2 md2 sm12 xs12 v-if="productToInsert.product_type == 3">
                                    <v-text-field
                                    label="Largo"
                                    :rules="onlyNumbers"
                                    v-model="productToInsert.length"
                                    ></v-text-field>
                                </v-flex>

                                <!-- General -->
                                
                                <v-flex lg3 md3 sm6 xs6>
                                    <v-text-field
                                    label="Precio del producto"
                                    :rules="onlyNumbers"
                                    @keyup="getTotalProductToInsert()"
                                    persistent-hint
                                    hint="Solo valores numéricos"
                                    v-model="productToInsert.product_price"></v-text-field>
                                </v-flex>
                               
                                <v-flex lg3 md3 sm12 xs12>
                                    <v-text-field
                                    v-if="form.details.ensurance == 1"
                                    label="Porcentaje por seguro"
                                    disabled
                                    append-icon="fa fa-percent"
                                    v-model="productToInsert.ensurance_value"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex lg3 md3 sm6 xs6>
                                    <v-text-field
                                    label="Total"
                                    disabled
                                    v-model="productToInsert.price"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex lg12 md12 sm12 xs12>
                                    <h4 style="margin-top: 15px; margin-bottom: 0">Moneda: {{ form.details.currency }}</h4>
                                </v-flex>
                                
                            </v-layout>
                        </v-container>
                    </v-card-title>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click.native="dialog.addProduct = false">
                            Cerrar
                        </v-btn>
                        <v-btn color="success" :loading="saveLoader" 
                        :disabled="saveLoader" 
                        @click="validateInsertProduct()">
                            Agregar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog 
            v-model="dialog.selectPackage"
            scrollable 
            max-width="800px">
            <v-card>
                <v-card-text>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tracking</th>
                                    <th>Fecha de salida</th>
                                    <th>Salida</th>
                                    <th>Fecha de Llegada</th>
                                    <th>Llegada</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="items in request.package">
                                    <td>{{ items.tracking }}</td>
                                    <td>{{ items.out_date }}</td>
                                    <td>{{ items.out_place }}</td>
                                    <td>{{ items.arriving_place }}</td>
                                    <td>
                                        <v-btn 
                                            depressed outline icon fab dark color="success" small
                                            @click="addPackage( items.id, items.tracking, items.out_date )">
                                            <v-icon>fa fa-plus</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="text-align: center; padding: 0.75rem" v-if="request.package.length === 0">
                            <h4>
                                <i class="fa fa-exclamation-circle"></i>&nbsp;
                                No hay datos para mostrar  
                            </h4>
                        </div>
                    </div>
                </v-card-text>
                 <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click.native="dialog.selectPackage = false">
                            Cerrar
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
            :timeout="3000"
            top
            right
            :color="snackbar.color"
            v-model="snackbar.show">  
            <p style="margin: 0">
                <i :class="snackbar.icon"></i>&nbsp;
                {{ snackbar.text }}
            </p>
            <v-btn dark flat @click.native="snackbar.show = false" icon> 
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
    
    </div>
</template>

<script>
import axios from '@/api/config'
import countriesList from '@/api/paisesymonedas'

export default {
    data () {
        return {
            countryUser: localStorage.getItem('country'),
            weight: 2900,
            modality: '',
            menu1: false,
            menu2: false,
            e1: 0,
            saveLoader: false,
            ensurance: '',
            taxes: [],
            taxesSelected: [],
            search: {
                client: '',
                afiliated: '',
                package: ''
            },
            snackbar: {
                show: false,
                text: '',
                color: '',
                icon: ''
            },
            disabledBtn: {
                firsStep: true,
                secondStep: true,
                thirStep: true,
                addClient: true,
                addAfiliate: true,
                modality: true,
                addPackage: true,
                goBackBeforeSave: false
            },
            request: {
                client: [],
                afiliates: [],
                package: []
            },
            disabled: {
                clientField: false,
                afiliateField: false,
                orderform: true
            },
            loading: {
                searchClient: false,
                searchAfiliate: false,
                getSubcategories: false,
                saveBtn: false,
                searchPackage: false,
            },
            dialog: {
                searchClient: false,
                searchAfiliate: false,
                addProduct: false,
                selectPackage: false
            },
            checkboxes: {
                afiliate: false,
                client: false,
                valueAfiliate: false,
                valueClient: false
            },
            productToInsert: {
                package: '',
                product_type: '',
                description: '',
                category_name: '',
                subcategory_name: '',
                category: '',
                subcategory: '',
                qty: '',
                weight: '',
                price: '',
                subtotal: '',
                kilo_id: '',
                kilo_value: '',
                ensurance_value: '',
                product_price: '',
                height: '',
                width: '',
                length: ''
            },
            onlyNumbers: [
                v => !!v || 'Campo requerido',
                v => !isNaN(v) || "Campo solo debe contener números"
            ],
            onlyText: [
                v => !!v || 'Campo requerido',
            ],
            onlyEmail: [
                v => /.+@.+/.test(v) || 'Formato de correo electrónico no válido'
            ],
            form: {
                client: {
                    id: null,
                    shipper: '',
                    contact_person: '',
                    doc_type: '',
                    number: '',
                    address: '',
                    country: '',
                    city: '',
                    phone: '',
                    email: '',
                },
                package: {
                    package_id: '',
                    out_date: '',
                    tracking: ''
                },
                afiliates: {
                    id: null,
                    doc_type: '',
                    number: '',
                    destination_name: '',
                    attention: '',
                    address: '',
                    clients_id: '',
                    country: '',
                    city: '',
                    phone: '',
                    email: '',
                },
                products: [],
                details: {
                    ensurance: '',
                    tracking: '',
                    out_date: '',
                    reason: '',
                    modality: '',
                    currency: '',
                },
                total: 0
            },
            basic: {
                taxes: [],
                countries: countriesList.pais,
                money: [],
                doc_types: [
                    { value: "1", text: 'PTP' },
                    { value: "2", text: 'DNI' },
                    { value: "3", text: 'Pasaporte' },
                    { value: "4", text: 'C.E.' },
                    { value: "5", text: 'C.I.' }        
                ],
                product_type: [
                    { value: 1, text: "Por Kilos" },
                    { value: 3, text: 'Kilo volumétrico' },
                    { value: 2, text: "Por Productos" },
                ],
                categories: [],
                subCategories: [],
                measureUnits: [],
                tealcaOffices: [
                    { value: "1", text: 'Oficina Tealca 1' },
                    { value: "2", text: 'Oficina Tealca 2' },
                    { value: "3", text: 'Oficina Tealca 3' },
                    { value: "4", text: 'Oficina Tealca 4' },
                    { value: "5", text: 'Oficina Tealca 5' },
                    { value: "6", text: 'Oficina Tealca 6' },
                    { value: "7", text: 'Oficina Tealca 7' },
                    { value: "8", text: 'Oficina Tealca 8' },
                    { value: "9", text: 'Oficina Tealca 9' },
                    { value: "10", text: 'Oficina Tealca 10' }
                ],
                modality: [
                    { value: "1", text: "Pago en el origen" },
                    { value: "2", text: "Cobro en destino" }
                ],
                ensurance: [
                    { value: "0", text: "No" },
                    { value: "1", text: "Si" }
                ],
                kilos: []
            },
        }
    },
    filters: {
        doc_typesFilter( doc_types ){
            const item_type = {
                1: "PTP",
                2: "DNI",
                3: "Pasaporte",
                4: "C.E.",
                5: "C.I."
            }
            return item_type[ doc_types ];
        }
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Modalidad'
          case 2: return 'Origen'
          case 3: return 'Destino'
          case 4: return 'Detalles'
          case 5: return 'Confirmar'
          default: return 'Confirmar'
        }
      }
    },
    watch: {
        
        modality: function( val ){
            this.form.details.modality = val
            this.blurStepOne()
        },
        ensurance: function( str ){
            this.form.details.ensurance = str
            this.blurStepOne()
        },
        taxes: function(){
            this.blurStepOne()
        }
    },
    mounted () {
        this.getTaxonomies()
        this.getTaxes()
    },
    created () {
        this.getPackage()
        this.setTracking()
    },
    methods: {
        getTaxes(){
            var country = localStorage.getItem('country')
            country = country.replace(/[ '"]+/g, '')
            axios.get( 'tax/by-country?country=' + country ).then( response => {
                this.basic.taxes = response.data.items
            })
        },
        getTaxesSelected(){
            for( var i = 0; i < this.taxes.length; i++ ){
                axios.get( 'tax/' + this.taxes[i] ).then( response => {
                    this.taxesSelected.push( response.data.data )
                })
            }
        },
        openAddProduct(){
            if( this.form.details.currency != '' ){
                this.dialog.addProduct = true
            } else {
                this.snackbar = { show: true, text: 'Debe seleccionar la moneda de pago primero', color: 'error', icon:'fa fa-exclamation-triangle' }
            }
        },
        getKiloCost(){
            axios.get( 'kilo/' + this.productToInsert.kilo_id ).then( response => {
                this.productToInsert.kilo_value = response.data.data.value
            })
        },
        getKilos(){
            if( this.form.details.modality == 1 ) {
                axios.get( 'kilo?country=' + this.form.client.country + '&currency=' + this.form.details.currency ).then( response => {
                    this.basic.kilos = response.data.items
                })
            } else if( this.form.details.modality == 2 ) {
                axios.get( 'kilo?country=' + this.form.afiliates.country + '&currency=' + this.form.details.currency ).then( response => {
                    this.basic.kilos = response.data.items
                })
            }
        },
        setTracking(){        
          axios.get( 'ship-order/get-tracking' ).then( response => {
            this.form.details.tracking = response.data.tracking
          })
        },
        blurStepOne(){
            if( this.form.details.modality != '' &&
                this.form.package.package_id != '' &&
                this.form.details.ensurance != '' &&
                this.taxes.length > 0 ){
                this.disabledBtn.modality = false
            } else {
                this.disabledBtn.modality = true
            }
        },
        addPackage( id, tracking, out_date  ){
            this.form.package.package_id = id
            this.form.package.tracking = tracking
            this.form.details.out_date = out_date
            this.dialog.selectPackage = false
            this.blurStepOne()
        },
        getPackage(){
            axios.get( 'package?ordered=1' ).then( response => {
                    if( response.data.status ){
                    this.request.package = response.data.items
                    this.disabledBtn.addPackage = false
                } else {
                    this.request.afiliates = []
                    this.disabledBtn.addAfiliate = true
                    this.snackbar = { show: true, text: response.data.msg, color: 'error', icon:'fa fa-exclamation-triangle' }
                }
                this.loading.searchPackage = false
            })
        },
        getCurrencies(){
            if( this.form.details.modality == 1 ){
                var result = this.basic.countries.find( country => country.value == this.form.client.country )
            } else if( this.form.details.modality == 2 ){
                var result = this.basic.countries.find( country => country.value == this.form.afiliates.country )
            }
            this.basic.money = result.money
        },  
        getAfiliated(){
            this.loading.searchAfiliate = true
            axios.get( 'afiliated/by-number?client=' + this.form.client.id + '&key=' + this.search.afiliated ).then( response => {
                if( response.data.status ){
                    this.request.afiliates = response.data.data
                    this.disabledBtn.addAfiliate = false
                } else {
                    this.request.afiliates = []
                    this.disabledBtn.addAfiliate = true
                    this.snackbar = { show: true, text: response.data.msg, color: 'error', icon:'fa fa-exclamation-triangle' }
                }
                this.loading.searchAfiliate = false
            })
        },
        addAfiliated( id, doc_type, number, destination_name, attention, address, clients_id, country, city, phone, email ){
            this.form.afiliates.id = id
            this.form.afiliates.doc_type = doc_type
            this.form.afiliates.number = number
            this.form.afiliates.destination_name = destination_name
            this.form.afiliates.attention = attention
            this.form.afiliates.address = address
            this.form.afiliates.clients_id = clients_id
            this.form.afiliates.country = country
            this.form.afiliates.city = city
            this.form.afiliates.phone = phone
            this.form.afiliates.email = email
            this.blurValidateAfiliate()
            this.disabled.afiliateField = true
            this.dialog.searchAfiliate = false
            this.checkboxes.afiliate = true
            this.search.afiliated = ''
        },
        blurValidate(){
            if ( this.form.client.shipper != '' &&
                 this.form.client.contact_person != '' &&
                 this.form.client.doc_type != '' &&
                 this.form.client.number != '' &&
                 this.form.client.country != '' &&
                 this.form.client.city != '' &&
                 this.form.client.phone != '' ) {
                    this.disabledBtn.firsStep = false
            } else {
                this.disabledBtn.firsStep = true
            }
        },
        blurValidateAfiliate(){
            if ( this.form.afiliates.destination_name != '' &&
                 this.form.afiliates.attention != '' &&
                 this.form.afiliates.doc_type != '' &&
                 this.form.afiliates.number != '' &&
                 this.form.afiliates.country != '' &&
                 this.form.afiliates.city != '' &&
                 this.form.afiliates.phone != '' ) {
                    this.disabledBtn.secondStep = false
            } else {
                this.disabledBtn.secondStep = true
            }
        },
        getTaxonomies(){
            axios.get( 'category' ).then( response => {
                this.basic.categories = response.data.items
            })
        },
        validateInsertProduct(){
            if (this.$refs.productForm.validate()) {
                this.addProduct()
            }
        },
        resetAddProductFields(){
            this.productToInsert.package = '' 
            this.productToInsert.product_type = ''
            this.productToInsert.description = ''
            this.productToInsert.category = ''
            this.productToInsert.subcategory = ''
            this.productToInsert.qty = ''
            this.productToInsert.weight = ''
            this.productToInsert.price = ''
            this.productToInsert.product_price = ''
            this.$refs.productForm.reset()
        },
        addProduct(){
            var rows = this.form.products.length
            var rows = rows + 1
            
            var data = {
                package: rows,
                product_type: this.productToInsert.product_type,
                description: this.productToInsert.description,
                category_id: this.productToInsert.category,
                subcategory_id: this.productToInsert.subcategory,
                category_name: this.productToInsert.category_name,
                subcategory_name: this.productToInsert.subcategory_name,
                qty: this.productToInsert.qty,
                weight: this.productToInsert.weight,
                price: this.productToInsert.price,
                subtotal: this.productToInsert.subtotal,
                kilo_id: this.productToInsert.kilo_id,
                kilo_value: this.productToInsert.kilo_value,
                ensurance_value: this.productToInsert.ensurance_value,
                product_price: this.productToInsert.product_price
            }
            this.cleanFields()
            this.form.products.push( data )
            this.getTotal()
            this.dialog.addProduct = false
            this.blurValidateOrder()
        },
        cleanFields(){
            this.productToInsert.package = ''
            this.productToInsert.product_type = ''
            this.productToInsert.description = ''
            this.productToInsert.category = ''
            this.productToInsert.subcategory = ''
            this.productToInsert.category_name = ''
            this.productToInsert.subcategory_name = ''
            this.productToInsert.qty = ''
            this.productToInsert.weight = ''
            this.productToInsert.price = ''
            this.productToInsert.subtotal = ''
            this.productToInsert.kilo_id = ''
            this.productToInsert.kilo_value = ''
            this.productToInsert.ensurance_value = ''
            this.productToInsert.product_price = ''
            this.$refs.productForm.resetValidation()
        },
        getTotalProductToInsert(){

            if( this.productToInsert.product_type == 1 ){
                var kilo = this.productToInsert.kilo_value,
                    product_price = this.productToInsert.product_price
                var total = parseFloat( kilo ) * parseFloat( this.productToInsert.weight )
                total = total.toFixed( 2 )
                if( this.form.details.ensurance == 1 ){
                    var ensurance = this.productToInsert.ensurance_value
                    var subtotal = ( parseFloat( ensurance ) * parseFloat( product_price ) ) / 100 
                    total = parseFloat( total ) + parseFloat( subtotal )
                    total = total.toFixed(2)
                }
                this.productToInsert.price = total
            } else if( this.productToInsert.product_type == 2 ){
                
                var price = this.productToInsert.subtotal,
                    qty = this.productToInsert.qty,
                    product_price = this.productToInsert.product_price
                var total = parseFloat( price ) * parseInt( qty )
                    total = total.toFixed(2)

                if( this.form.details.ensurance == 1 ){
                    var ensurance = this.productToInsert.ensurance_value
                    var subtotal = ( parseFloat( ensurance ) * parseFloat( product_price ) ) / 100 
                    total = parseFloat( total ) + parseFloat( subtotal )
                    total = total.toFixed(2)
                }

                this.productToInsert.price = total
            } else if( this.productToInsert.product_type == 3 ) {
                var product_price = this.productToInsert.product_price,
                    height = this.productToInsert.height,
                    width = this.productToInsert.width,
                    length = this.productToInsert.length,
                    kilo = this.productToInsert.kilo_value

                var volumetric = 0
                    volumetric = parseFloat( width ) * parseFloat( height ) * parseFloat( length )
                    volumetric = parseFloat( volumetric ) / 5000
                this.productToInsert.weight = volumetric.toFixed( 2 )
                    
                var total = parseFloat( kilo ) * parseFloat( volumetric )
                    total = total.toFixed( 2 )
                 
                if( this.form.details.ensurance == 1 ){
                    var ensurance = this.productToInsert.ensurance_value
                    var subtotal = ( parseFloat( ensurance ) * parseFloat( product_price ) ) / 100 
                    total = parseFloat( total ) + parseFloat( subtotal )
                    total = total.toFixed(2)
                }

                this.productToInsert.price = total
            }

        },
        setSubcategoryName(){
            if( this.productToInsert.subcategory != undefined ){
                axios.get( 'subcategory/' + this.productToInsert.subcategory ).then( response => {
                    this.productToInsert.subcategory_name = response.data.data.name
                })
            }
        },
        getSubcategories(){
            if( this.productToInsert.category !== undefined ){
                this.loading.getSubcategories = true
                axios.get( 'category/' + this.productToInsert.category ).then( response => {
                    this.productToInsert.ensurance_value = response.data.data.ensurance.value
                    this.productToInsert.category_name = response.data.data.name
                    this.getTotalProductToInsert()
                })
                if( this.productToInsert.category != '' ){
                    axios.get( 'subcategory/by-category/' + this.productToInsert.category ).then( response => {
                        if( response.data.status ){
                            this.basic.subCategories = response.data.data
                        } else {
                            this.basic.subCategories = []
                            this.snackbar = { show: true, text: response.data.msg, color: 'error', icon:'fa fa-exclamation-triangle' }
                        }
                        this.loading.getSubcategories = false
                    })
                }
            }
        },
        validateFindClient(){
            event.preventDefault()
            this.loading.searchClient = true
            if (this.$refs.findClientForm.validate()) {
                axios.get( 'clients/by-number?key=' + this.search.client ).then( response => {
                    if( response.data.status ){
                        this.request.client = response.data.data
                        this.disabledBtn.addClient = false
                    } else {
                        this.snackbar = { show: true, text: response.data.msg, color: 'error', icon:'fa fa-exclamation-triangle' }
                        this.request.client = []
                        this.disabledBtn.addClient = true
                    }
                    this.loading.searchClient = false
                })
            }
        },
        addClient(){
            this.form.client.id = this.request.client[0].id
            this.form.client.doc_type = this.request.client[0].doc_type
            this.form.client.number = this.request.client[0].number
            this.form.client.shipper = this.request.client[0].shipper
            this.form.client.contact_person = this.request.client[0].contact_person
            this.form.client.address = this.request.client[0].address
            this.form.client.country = this.request.client[0].country
            this.form.client.city = this.request.client[0].city
            this.form.client.phone = this.request.client[0].phone
            this.form.client.email = this.request.client[0].email
            this.disabled.clientField = true
            this.dialog.searchClient = false
            this.checkboxes.client = true
            this.request.client = []
            this.search.client = ''
            this.$refs.findClientForm.reset()
            this.resetAfiliateFields()
            this.blurValidate()
            this.checkboxes.valueClient = false
        },
        resetAfiliateFields(){
            this.form.afiliates.id = null
            this.form.afiliates.doc_type = ''
            this.form.afiliates.number = ''
            this.form.afiliates.destination_name = ''
            this.form.afiliates.attention = ''
            this.form.afiliates.address = ''
            this.form.afiliates.country = ''
            this.form.afiliates.city = ''
            this.form.afiliates.phone = ''
            this.form.afiliates.email = ''
            this.disabled.afiliateField = false
            this.checkboxes.afiliate = false
            this.$refs.addAfiliateForm.resetValidation()
            this.blurValidateAfiliate()
        },
        getTotal(){
            this.form.total = 0
            var totalTax = 0
            for( var i = 0; i < this.taxesSelected.length; i++ ){
                totalTax += parseFloat( this.taxesSelected[i].value )
            }
            var total = 0
            for( var i = 0; i < this.form.products.length; i++ ){
                total += parseFloat( this.form.products[i].price )
            }
            var taxNum = parseFloat( total ) * parseFloat( totalTax ) / 100
            this.form.total = parseFloat( total ) + parseFloat( taxNum )
            this.form.total = parseFloat( this.form.total )
            this.form.total = this.form.total.toFixed(2)
        },
        resetClientFields(){
            this.form.client.id = null
            this.form.client.doc_type = ''
            this.form.client.number = ''
            this.form.client.shipper = ''
            this.form.client.contact_person = ''
            this.form.client.address = ''
            this.form.client.country = ''
            this.form.client.city = ''
            this.form.client.phone = ''
            this.form.client.email = ''
            this.disabled.clientField = false
            this.checkboxes.client = false
            this.$refs.clientForm.reset()
            this.resetAfiliateFields()
            this.blurValidate()
        },
        removeProduct( index ){
            this.form.products.shift( index )
            var count = this.form.products.length
            for( var i = 0; i < count; i++ ){
                this.form.products[i].package = i + 1
            }
            this.getTotal()
        },
        blurValidateOrder(){
            if( this.$refs.addOrderForm.validate() && this.form.products.length > 0 ){
                this.disabled.orderform = false
            } else {
                this.disabled.orderform = true
                this.$refs.addOrderForm.resetValidation()
            }
        },
        updateClientIfSelected(){
            var client = {
                shipper: this.form.client.shipper,
                contact_person: this.form.client.contact_person,
                doc_type: this.form.client.doc_type,
                number: this.form.client.number,
                address: this.form.client.address,
                country: this.form.client.country,
                city: this.form.client.city,
                phone: this.form.client.phone,
                email: this.form.client.email
            }
            axios.put( 'clients/' + this.form.client.id, client ).then( response => {
                console.log( response.data.status )
            }).catch( error => {
                console.log( error )
            })
        },
        updateAfiliateIfSelected(){
            var afiliate = {
                doc_type: this.form.afiliates.doc_type,
                number: this.form.afiliates.number,
                destination_name: this.form.afiliates.destination_name,
                attention: this.form.afiliates.attention,
                address: this.form.afiliates.address,
                country: this.form.afiliates.country,
                city: this.form.afiliates.city,
                phone: this.form.afiliates.phone,
                email: this.form.afiliates.email
            }   
            axios.put( 'afiliated/' + this.form.afiliates.id, afiliate ).then( response => {   
                console.log( response.data.status )
            }).catch( error => {
                console.log( error )
            })
        },
        saveClientIfNot(){
            var client = {
                shipper: this.form.client.shipper,
                contact_person: this.form.client.contact_person,
                doc_type: this.form.client.doc_type,
                number: this.form.client.number,
                address: this.form.client.address,
                country: this.form.client.country,
                city: this.form.client.city,
                phone: this.form.client.phone,
                email: this.form.client.email
            }
            axios.post( 'clients/', client ).then( response => {
                this.form.client.id =  response.data.clients_id
                this.saveAfiliateIfNot( response.data.clients_id )
            }).catch( error => {
                console.log( error )
            })
        },
        saveAfiliateIfNot( clients_id ){
            var afiliate = {
                doc_type: this.form.afiliates.doc_type,
                number: this.form.afiliates.number,
                destination_name: this.form.afiliates.destination_name,
                attention: this.form.afiliates.attention,
                address: this.form.afiliates.address,
                clients_id: clients_id,
                country: this.form.afiliates.country,
                city: this.form.afiliates.city,
                phone: this.form.afiliates.phone,
                email: this.form.afiliates.email
            }   
            axios.post( 'afiliated/', afiliate ).then( response => {   
                this.form.afiliates.id = response.data.client_afiliated_id
                this.saveOrder()
            }).catch( error => {
                console.log( error )
            })
        },
        save(){
            this.disabledBtn.goBackBeforeSave = true
            this.loading.saveBtn = true
            if( this.form.client.id == null ){
                this.saveClientIfNot()
            } else if( this.form.client.id != null && this.form.afiliates.id == null ) {
                this.updateClientIfSelected()
                this.saveAfiliateIfNot( this.form.client.id )
            } else if( this.form.client.id != null && this.form.afiliates.id != null ) {
                this.updateClientIfSelected()
                this.updateAfiliateIfSelected()
                this.saveOrder()
            }
        },
        saveOrder(){
             var data = {
                ensurance: this.form.details.ensurance,
                tracking: this.form.details.tracking,
                clients_id: this.form.client.id,
                client_afiliated_id: this.form.afiliates.id,
                package_id: this.form.package.package_id,
                reason: this.form.details.reason,
                modality: this.form.details.modality,
                currency: this.form.details.currency,
                taxes: this.taxesSelected,
                total: this.form.total,
                products: this.form.products
            }
            axios.post( 'ship-order', data ).then( response => {
                if( response.data.status ){
                    this.snackbar = { show: true, text: response.data.response, color: 'success', icon:'fa fa-check' }
                    this.$router.push('/ordenes-de-envios/listado')
                } else {
                    this.snackbar = { show: true, text: response.data.response, color: 'error', icon:'fa fa-exclamation-triangle' }
                }
            }).catch( error => {
                this.snackbar = { show: true, text: error, color: 'error', icon:'fa fa-exclamation-triangle' }
            })
        }
    }
}
</script>

<style scoped>
    .table-responsive table{
        width: 100%;
    }
    th{
        padding: 10px;
        background: rgb( 230,230,230 );
    }
    .search-btn{
        display: block; 
        width: 100%;
        padding: 0.95rem; 
        border-bottom: solid 2px transparent; 
        background: #FFF; 
        color: #555;
        outline: none;
        transition: ease 0.3s;
    }
    .search-btn:hover {
        background: rgb( 230,230,230 );
    }
    td{
        padding: 7px;
    }
    @media( max-width: 495px ){
        .table-responsive table{
            overflow-x: scroll;
        }   
    }

</style>