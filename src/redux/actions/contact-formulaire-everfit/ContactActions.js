import axios from "axios";
import qs from "qs";
import {
  GET_CONTACT_FORMULAIRE_EVERFIT,
  DELETE_CONTACT_FORMULAIRE_EVERFIT,
  ADD_CONTACT_FORMULAIRE_EVERFIT,
} from "../../../data/actionTypes";
import { _base_url_contact_formulaire_everfit } from "../../../data/config";
import { alert, handleSnackbar } from "../AlertActions";
import { data } from "../../../data/routes/routesData";

export const getContactFormEverfit = (filter) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        _base_url_contact_formulaire_everfit + "?" + qs.stringify(filter)
      );
      dispatch({
        type: GET_CONTACT_FORMULAIRE_EVERFIT,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteContactFormEverfit = (ContactID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(_base_url_contact_formulaire_everfit +"/" + ContactID);
      dispatch({
        type: DELETE_CONTACT_FORMULAIRE_EVERFIT,
        payload: res.data,
      });

      res.status === 200
        ? dispatch(
            handleSnackbar("Contact Game supprimé avec succès", "success")
          )
        : dispatch(handleSnackbar("Contact Game non supprimé", "error"));

      dispatch(getContactFormEverfit());
    } catch (err) {
      dispatch(handleSnackbar(`erreur 404`, "error"));
    }
  };
};

export const addContactFormEverfit = (Contact) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const res = await axios.post(_base_url_contact_formulaire_everfit, Contact, config);
      if (res.status === 200) {
        await dispatch(
          handleSnackbar("Demande envoyée avec succès", "success")
        );
        setTimeout((window.location.href = data.accueil), 2500);
      } else {
        dispatch(handleSnackbar("Demande non envoyée", "error"));
      }
      dispatch({
        type: ADD_CONTACT_FORMULAIRE_EVERFIT,
      });
      dispatch(getContactFormEverfit());
    } catch (err) {
      dispatch(alert(err.response.data.errors));
      dispatch(
        handleSnackbar(
          "oups!! un erreur s'est produi! Demande non envoyée",
          "error"
        )
      );
    }
  };
};
