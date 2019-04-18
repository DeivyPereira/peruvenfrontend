<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
          <v-form ref="loginForm" @submit="login()">
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">Sistema Peruven</h1>
                </div>                
                  <v-text-field 
                    append-icon="person" 
                    name="email" 
                    label="Correo Electrónico" 
                    type="text"
                    :rules="[v => !!v || 'Campo requerido']"
                    v-model="model.username"></v-text-field>
                  <v-text-field 
                    append-icon="lock" 
                    name="password" 
                    label="Contraseña" 
                    id="password" 
                    type="password" 
                    :rules="[v => !!v || 'Campo requerido']"
                    v-model="model.password"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" block color="primary" :loading="loading">Iniciar Sesión</v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
      :timeout="3000"
      top
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >  
    <p style="margin: 0">
      <i :class="snackbar.icon"></i>&nbsp;
      {{ snackbar.text }}
    </p>
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from '@/api/config'

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: ''
    },
    snackbar: {
      show: false,
      text: '',
      color: '',
      icon: ''
    },
  }),
  methods: {
    login () {
      event.preventDefault()
      this.loading = true;
      var data = {
        email: this.model.username,
        password: this.model.password
      }
      if( this.$refs.loginForm.validate() ){
        axios.post( 'login', data ).then( response => {
          if( response.data.status ){
            var token = response.data.token
            var role = JSON.stringify( response.data.role )
            window.localStorage.setItem( 'country', JSON.stringify( response.data.country ) )
            window.localStorage.setItem( 'role', role )
            window.localStorage.setItem( 'token', token )
            window.localStorage.setItem( 'session', 'true' )
            if( role == '"1"' ){
              this.$router.push('/dashboard');
            } else {
              this.$router.push('/ordenes-de-envios/listado');
            }
            
          } else {
            this.snackbar = { 
                              show: true, 
                              text: response.data.msg, 
                              color: 'error',
                              icon:'fa fa-exclamation-circle' 
                            }
            this.loading = false;
          }
        })
      } else {
        this.loading = false;
      }
      /*
      setTimeout(() => {
        this.$router.push('/dashboard');
      }, 1000);
      */
    }
  }
};
</script>
<style scoped>
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
