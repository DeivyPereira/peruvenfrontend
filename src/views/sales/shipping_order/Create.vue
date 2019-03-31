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
                        <v-label>Selecciona la modalidad:</v-label>
                        <v-radio-group v-model="modality" row>
                            <v-radio
                                v-for="item in basic.modality"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value"
                            ></v-radio>
                        </v-radio-group>
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
                                        :disabled="disabled.clientField"
                                        label="Persona de Contacto">
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidate()"
                                        :rules="[v => !!v || 'Campo requerido']" 
                                        v-model="form.client.phone"
                                        :disabled="disabled.clientField"
                                        label="Número Telefónico">
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidate()"
                                        v-model="form.client.email"
                                        :disabled="disabled.clientField"
                                        label="Correo Electrónico">
                                    </v-text-field>
                                </v-flex>

                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field   
                                        @keyup="blurValidate()"
                                        v-model="form.client.address"
                                        :disabled="disabled.clientField"
                                        label="Dirección">
                                    </v-text-field>
                                </v-flex>

                                <v-flex lg6 md6 sm12 xs12>
                                    <v-select
                                        @input="blurValidate(); getCurrencies()"
                                        :disabled="disabled.clientField"
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
                                        :disabled="disabled.clientField"
                                        :rules="onlyText"
                                        label="Ciudad">
                                    </v-text-field>
                                </v-flex>

                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidate()"
                                        v-model="form.client.zip"
                                        :disabled="disabled.clientField"
                                        :rules="[v => !!v || 'Campo requerido']"
                                        label="Código Postal / ZIP">
                                    </v-text-field>
                                </v-flex>

                                <v-flex>
                                     <v-select
                                        v-if="modality == 1"
                                        @input="blurValidate()"
                                        label="Moneda de Pago"
                                        :items="basic.money"
                                        v-model="form.details.currency"
                                        item-text="money"
                                        item-value="money"
                                        :rules="[v => !!v || 'Campo requerido']">
                                    </v-select>
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
                                    :disabled="disabled.afiliateField"
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
                                    :disabled="disabled.afiliateField"
                                    v-model="form.afiliates.address"
                                    :rules="onlyText"
                                    label="Dirección"></v-text-field>
                                </v-flex>
                                <v-flex lg3 md3 sm12 xs12>
                                    <v-select
                                        @input="blurValidateAfiliate(); getCurrencies()"
                                        :disabled="disabled.afiliateField"
                                        label="País"
                                        :rules="[v => !!v || 'Campo requerido']"
                                        :items="basic.countries"
                                        v-model="form.afiliates.country"
                                        item-text="label"
                                        item-value="value">
                                    </v-select>
                                </v-flex>
                                <v-flex lg3 md3 sm12 xs12>
                                    <v-text-field
                                    @keyup="blurValidateAfiliate()"
                                    :disabled="disabled.afiliateField"
                                    v-model="form.afiliates.city"
                                    :rules="onlyText"
                                    label="Ciudad"></v-text-field>
                                </v-flex>
                                <v-flex lg3 md3 sm12 xs12>
                                    <v-text-field
                                    @keyup="blurValidateAfiliate()"
                                    :disabled="disabled.afiliateField"
                                    v-model="form.afiliates.zip"
                                    :rules="onlyNumbers"
                                    label="Código Postal / ZIP"></v-text-field>
                                </v-flex>
                                <v-flex lg3 md3 sm12 xs12>
                                    <v-text-field
                                        @keyup="blurValidateAfiliate()"
                                        :disabled="disabled.afiliateField"
                                        v-model="form.afiliates.phone"
                                        :rules="[v => !!v || 'Campo requerido']"
                                        label="Número telefónico">
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                    @keyup="blurValidateAfiliate()"
                                    :disabled="disabled.afiliateField"
                                    v-model="form.afiliates.email"
                                    label="Correo Electrónico"></v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-select
                                        label="Oficina de Tealca"
                                        :items="basic.tealcaOffices"
                                        v-model="form.details.tealca_office"
                                        item-text="text"
                                        item-value="value">
                                    </v-select>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                    v-model="form.details.tealca_code"
                                    label="Código Tealca"></v-text-field>
                                </v-flex>
                                <v-flex>
                                     <v-select
                                        v-if="modality == 2"
                                        @input="blurValidateAfiliate()"
                                        label="Moneda de Pago"
                                        :items="basic.money"
                                        v-model="form.details.currency"
                                        item-text="money"
                                        item-value="money"
                                        :rules="[v => !!v || 'Campo requerido']">
                                    </v-select>
                                </v-flex>
                            </v-layout>

                            <v-layout>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-btn flat @click="e1 = 2">
                                        Regresar
                                    </v-btn>
                                    <v-btn color="primary" :disabled="disabledBtn.secondStep" @click="e1 = 4">
                                        Continuar
                                    </v-btn>
                                    <v-btn color="error" @click="resetAfiliateFields()" v-if="disabled.afiliateField">
                                        Restablecer
                                    </v-btn>
                                </v-flex>
                                
                                <v-flex lg3 md3 sm12 xs12 style="text-align: right">
                                    <v-btn color="success" v-if="form.client.id !== null" @click="dialog.searchAfiliate = true" flat>
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
                                    <v-text-field
                                    v-model="form.details.airwaybill"
                                    @blur="blurValidateOrder()"
                                    label="Airwaybill"></v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-menu
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            @blur="blurValidateOrder()"
                                            :rules="onlyText"
                                            v-model="form.details.out_date"
                                            label="Fecha de salida"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="form.details.out_date" @input="menu2 = false" locale="es-es"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Paquete N°</th>
                                            <th>Descripción del bien</th>
                                            <th>Unidades</th>
                                            <th>Costo Unitario</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="( items, index ) in form.products" :key="items.package">
                                            <td>{{ items.package }}</td>
                                            <td>{{ items.description }}</td>
                                            <td>{{ items.qty }}</td>
                                            <td v-if="items.weight == ''">{{ items.price }} {{ form.details.currency }}</td>
                                            <td v-if="items.weight != ''">{{ items.weight }} Kg</td>
                                            <td>{{ items.subtotal }} {{ form.details.currency }}</td>
                                            <td>
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
                                            <td style="text-align: right">
                                                <strong>
                                                    Kilos:
                                                </strong>
                                            </td>
                                            <td>
                                                {{ weight }}
                                            </td>
                                            <td></td>
                                            <td style="text-align: right">
                                                <strong>
                                                    Total:
                                                </strong>
                                            </td>
                                            <td>
                                                {{ form.total }} {{ form.details.currency }}
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
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                    @blur="blurValidateOrder()"
                                    :rules="onlyText"
                                    v-model="form.details.name"
                                    label="Nombre"></v-text-field>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-text-field
                                    @blur="blurValidateOrder()"
                                    v-model="form.details.position"
                                    label="Posición"></v-text-field>
                                </v-flex>
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            @blur="blurValidateOrder()"
                                            :rules="onlyText"
                                            v-model="form.details.date"
                                            label="Fecha"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="form.details.date" @input="menu2 = false" locale="es-es"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex lg12 md12 sm12 xs12>
                                    <v-textarea
                                    @blur="blurValidateOrder()"
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
                                    <v-btn color="success" @click="dialog.addProduct = true; resetAddProductFields()" flat>
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
                                <strong>Teléfono:</strong>&nbsp;
                                {{ form.client.phone }}<br>
                                <strong>Correo Electrónico:</strong>&nbsp;
                                {{ form.client.email }}<br>
                                <strong>Código Postal / ZIP:</strong>&nbsp;
                                {{form.client.zip }}<br>
                                <strong>Airwaybill:</strong>&nbsp;
                                {{ form.details.airwaybill }}<br>
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
                                <strong>Teléfono:</strong>&nbsp;
                                {{ form.afiliates.phone }}<br>
                                <strong>Correo Elecrónico:</strong>&nbsp;
                                {{ form.afiliates.email }}<br>
                                <strong>Código Postal / ZIP:</strong>&nbsp;
                                {{ form.afiliates.zip }}<br>
                                <strong>Oficina Tealca:</strong>&nbsp;
                                {{ form.details.tealca_office }}<br>
                                <strong>Código Tealca:</strong>&nbsp;
                                {{ form.details.tealca_code }}<br>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex lg12 md12 sm12>
                                <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Paquete N°</th>
                                            <th>Descripción del bien</th>
                                            <th>Unidades</th>
                                            <th>Costo Unitario</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="items in form.products" :key="items.package">
                                            <td>{{ items.package }}</td>
                                            <td>{{ items.description }}</td>
                                            <td>{{ items.qty }}</td>
                                            <td v-if="items.weight == ''">{{ items.price }} {{ form.details.currency }}</td>
                                            <td v-if="items.weight != ''">{{ items.weight }} Kg</td>
                                            <td>{{ items.subtotal }} {{ form.details.currency }}</td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: right">
                                                <strong>
                                                    Kilos:
                                                </strong>
                                            </td>
                                            <td>
                                                {{ weight }}
                                            </td>
                                            <td></td>
                                            <td style="text-align: right">
                                                <strong>
                                                    Total:
                                                </strong>
                                            </td>
                                            <td>
                                                {{ form.total }} {{ form.details.currency }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <strong>Razón de exportación</strong><br>
                                {{ form.details.reason }}
                            </v-flex>
                            <v-flex lg6 md6 sm12>
                                <strong>Nombre:</strong>&nbsp;
                                {{ form.details.name }}<br>
                                <strong>Posición:</strong>&nbsp;
                                {{ form.details.position }}<br>
                            </v-flex>
                            <v-flex lg6 md6 sm12>
                                <strong>Fecha:</strong>&nbsp;
                                {{ form.details.date }}
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
                                <tr v-for="items in request.client" :key="items.id">
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

        <v-dialog v-model="dialog.searchAfiliate" max-width="600px">
            <v-card>
                <v-form @submit="getAfiliated()" ref="findAfiliatedForm">
                    <v-card-title>
                        <v-layout wrap>
                            <v-flex lg10 md10 sm10 xs10>
                                <v-text-field :loading="loading.searchAfiliate"
                                v-model="search.afiliated"
                                label="Nombre o documento del afiliado"></v-text-field>
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
                                    <th>Teléfono</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="items in request.afiliates" :key="items.id">
                                    <td>{{ items.doc_type | doc_typesFilter }} {{ items.number }}</td>
                                    <td>{{ items.destination_name }}</td>
                                    <td>{{ items.phone }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="text-align: center; padding: 0.75rem" v-if="request.afiliates.length === 0">
                            <h4>
                                <i class="fa fa-exclamation-circle"></i>&nbsp;
                                Realice su búsqueda  
                            </h4>
                        </div>
                    </div>
                </v-card-text>
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click.native="dialog.searchAfiliate = false">
                        Cerrar
                    </v-btn>
                    <v-btn color="success" 
                    :loading="saveLoader" 
                    :disabled="disabledBtn.addAfiliate"  
                    @click="addAfiliated()">
                        Agregar
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
                                <v-flex lg4 md4 sm12 xs12>
                                    <v-select
                                        label="Tipo de Producto"
                                        v-model="productToInsert.product_type"
                                        :items="basic.product_type"
                                        :rules="[v => !!v || 'Campo requerido']" 
                                        item-text="text"
                                        item-value="value">
                                    </v-select>
                                </v-flex>
                                <v-flex lg8 md8 sm12 xs12>
                                    <v-text-field
                                    label="Descripción del bien"
                                    :rules="[v => !!v || 'Campo requerido']" 
                                    v-model="productToInsert.description"></v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-select
                                        label="Categoría"
                                        :items="basic.categories"
                                        v-model="productToInsert.category"
                                        @input="getSubcategories()"
                                        :rules="[v => !!v || 'Campo requerido']" 
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
                                        :rules="[v => !!v || 'Campo requerido']" 
                                        item-text="name"
                                        item-value="id">
                                    </v-select>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12>
                                    <v-text-field
                                    label="Cantidades"
                                    :rules="onlyNumbers"
                                    type="number"
                                    persistent-hint
                                    hint="Solo valores numéricos"
                                    v-model="productToInsert.qty"></v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12 v-if="productToInsert.product_type == 2">
                                    <v-text-field
                                    :rules="onlyNumbers" 
                                    label="Costo Unitario"
                                    type="number"
                                    persistent-hint
                                    hint="Decimales separados por '.'"
                                    v-model="productToInsert.price"></v-text-field>
                                </v-flex>
                                <v-flex lg6 md6 sm12 xs12 v-if="productToInsert.product_type == 1">
                                    <v-text-field
                                    :rules="onlyNumbers" 
                                    label="Peso"
                                    type="number"
                                    persistent-hint
                                    hint="Decimales separados por '.'"
                                    v-model="productToInsert.weight"></v-text-field>
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
            weight: 2900,
            modality: '',
            menu1: false,
            menu2: false,
            e1: 0,
            saveLoader: false,
            search: {
                client: '',
                afiliated: '',
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
                goBackBeforeSave: false
            },
            request: {
                client: [],
                afiliates: []
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
                saveBtn: false
            },
            dialog: {
                searchClient: false,
                searchAfiliate: false,
                addProduct: false
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
                category: '',
                subcategory: '',
                qty: '',
                weight: '',
                price: '',
                subtotal: ''
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
                    zip: '',
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
                    zip: '',
                    phone: '',
                    email: '',
                },
                products: [],
                details: {
                    airwaybill: '',
                    out_date: '',
                    name: '',
                    position: '',
                    date: '',
                    tealca_office: '',
                    tealca_code: '',
                    reason: '',
                    modality: '',
                    currency: ''
                },
                total: 0
            },
            basic: {
                countries: countriesList.pais,
                money: [],
                doc_types: [
                    { value: "1", text: 'Pto' },
                    { value: "2", text: 'Pasaporte' },
                    { value: "3", text: 'C.E:' },
                    { value: "4", text: 'C.I.' }        
                ],
                product_type: [
                    { value: 1, text: "Por Kilos" },
                    { value: 2, text: "Por Productos" }
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
                ]
            },
        }
    },
    filters: {
        doc_typesFilter( doc_types ){
            const item_type = {
                1: "Pto",
                2: "Pasaporte",
                3: "C.E.",
                4: "C.I."
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
            if( val == "1" || val == "2" ){
                this.disabledBtn.modality = false
                this.form.details.modality = val
            } else {
                this.disabledBtn.modality = true
            }
        }

    },
    mounted () {
        this.getTaxonomies()
    },
    methods: {
        getCurrencies(){
            var result = this.basic.countries.find( country => country.value == this.form.client.country )
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
        addAfiliated(){
            this.form.afiliates.id = this.request.afiliates[0].id
            this.form.afiliates.doc_type = this.request.afiliates[0].doc_type
            this.form.afiliates.number = this.request.afiliates[0].number
            this.form.afiliates.destination_name = this.request.afiliates[0].destination_name
            this.form.afiliates.attention = this.request.afiliates[0].attention
            this.form.afiliates.address = this.request.afiliates[0].address
            this.form.afiliates.clients_id = this.request.afiliates[0].clients_id
            this.form.afiliates.country = this.request.afiliates[0].country
            this.form.afiliates.city = this.request.afiliates[0].city
            this.form.afiliates.phone = this.request.afiliates[0].phone
            this.form.afiliates.email = this.request.afiliates[0].email
            this.form.afiliates.zip = this.request.afiliates[0].zip
            this.disabled.afiliateField = true
            this.dialog.searchAfiliate = false
            this.checkboxes.afiliate = true
            this.request.afiliates = []
            this.search.afiliated = ''
            this.$refs.findAfiliatedForm.reset()
            this.blurValidateAfiliate()
            this.checkboxes.valueAfiliate = false
        },
        blurValidate(){
            if ( this.form.client.shipper != '' &&
                 this.form.client.contact_person != '' &&
                 this.form.client.doc_type != '' &&
                 this.form.client.number != '' &&
                 this.form.client.country != '' &&
                 this.form.client.city != '' &&
                 this.form.client.phone != '' &&
                 this.form.client.zip != '' &&
                 !isNaN( this.form.client.zip ) ) {
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
                 this.form.afiliates.phone != '' &&
                 this.form.afiliates.zip != '' &&
                 !isNaN( this.form.afiliates.zip ) ) {
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
            this.$refs.productForm.reset()
        },
        addProduct(){
            var rows = this.form.products.length
            var rows = rows + 1
            
            if( this.productToInsert.weight != '' ) {
                this.productToInsert.weight = parseFloat( this.productToInsert.weight )
                this.productToInsert.weight = this.productToInsert.weight.toFixed(2)
                this.productToInsert.price = parseFloat( this.productToInsert.weight ) * parseFloat( this.weight )
            }
            var subtotal = parseFloat( this.productToInsert.price ) * parseFloat( this.productToInsert.qty )
            var subtotal = subtotal.toFixed(2)
            this.productToInsert.price = parseFloat( this.productToInsert.price )
            this.productToInsert.price = this.productToInsert.price.toFixed(2)
            
            var data = {
                package: rows,
                product_type: this.productToInsert.product_type,
                description: this.productToInsert.description,
                category_id: this.productToInsert.category,
                subcategory_id: this.productToInsert.subcategory,
                qty: this.productToInsert.qty,
                weight: this.productToInsert.weight,
                price: this.productToInsert.price,
                subtotal: subtotal
            }
            this.form.products.push( data )
            this.getTotal()
            this.dialog.addProduct = false
            this.blurValidateOrder()
        },
        getSubcategories(){
            if( this.productToInsert.category !== undefined ){
                this.loading.getSubcategories = true
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
            this.form.client.zip = this.request.client[0].zip
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
            this.form.afiliates.zip = ''
            this.disabled.afiliateField = false
            this.checkboxes.afiliate = false
            this.$refs.addAfiliateForm.resetValidation()
            this.blurValidateAfiliate()
        },
        getTotal(){
            this.form.total = 0
            var total = 0
            for( var i = 0; i < this.form.products.length; i++ ){
                total += parseFloat( this.form.products[i].subtotal )
            }
            this.form.total = total
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
            this.form.client.zip = ''
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
        save(){
          //  this.disabledBtn.goBackBeforeSave = true
           // this.loading.saveBtn = true
            // Guardar los clientes en caso sea requerido
            if( this.form.client.id == null ){
                var client = {
                    shipper: this.form.client.shipper,
                    contact_person: this.form.client.contact_person,
                    doc_type: this.form.client.doc_type,
                    number: this.form.client.number,
                    address: this.form.client.address,
                    country: this.form.client.country,
                    city: this.form.client.city,
                    phone: this.form.client.phone,
                    email: this.form.client.email,
                    zip: this.form.client.zip
                }
                axios.post( 'clients/', client ).then( response => {
                    this.form.client.id =  response.data.clients_id
                    console.log( 'Cliente Registrado' )
                    if( this.form.afiliates.id == null ){
                        var afiliate = {
                            doc_type: this.form.afiliates.doc_type,
                            number: this.form.afiliates.number,
                            destination_name: this.form.afiliates.destination_name,
                            attention: this.form.afiliates.attention,
                            address: this.form.afiliates.address,
                            clients_id: response.data.clients_id,
                            country: this.form.afiliates.country,
                            city: this.form.afiliates.city,
                            zip: this.form.afiliates.zip,
                            phone: this.form.afiliates.phone,
                            email: this.form.afiliates.email
                        }   
                        axios.post( 'afiliated/', afiliate ).then( response => {   
                            console.log( 'Afiliado al cliente registrado' )
                            this.form.afiliates.id = response.data.client_afiliated_id
                            this.saveOrder()
                        }).catch( error => {
                            console.log( error )
                        })   
                    }
                }).catch( error => {
                    console.log( error )
                })
            } else {
                this.saveOrder()
            }
        },
        saveOrder(){
             var data = {
                clients_id: this.form.client.id,
                client_afiliated_id: this.form.afiliates.id,
                airwaybill: this.form.details.airwaybill,
                out_date: this.form.details.out_date,
                name: this.form.details.name,
                position: this.form.details.position,
                date: this.form.details.date,
                tealca_office: this.form.details.tealca_office,
                tealca_code: this.form.details.tealca_code,
                reason: this.form.details.reason,
                modality: this.form.details.modality,
                currency: this.form.details.currency,
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