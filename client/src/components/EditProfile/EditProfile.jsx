import React from "react";
// Import des differents hook
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Import axios pour requete API
import axios from "axios";
// Import des reducers
import { setUser, setAllUser } from "../../features/userSlice";
// Import style
import "./editProfile.css";

const EditProfile = () => {
  // Import du store pour verifier si il y a le token de connexion
  const userToken = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirection si pas de token
  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, [userToken]);

  // Création de state local avec le hook useState pour stocker les value du formulaire
  const [civility, setCivility] = useState("");
  const [category, setCategory] = useState("");
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState("");

  // Fonction pour modifier les informations du user
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:9000/api/collaborateurs/${user.id}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        gender: civility,
        firstname: name,
        lastname,
        email,
        password,
        phone,
        birthdate,
        city,
        country,
        photo,
        service: category,
      },
    })
      .then((res) => {
        console.log(res);
        // Une fois les modifs enregistrées, on referesh le store User
        axios({
          method: "get",
          url: `http://localhost:9000/api/collaborateurs/${user.id}`,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((res) => {
            console.log(res);
            dispatch(setUser(res.data));
          })
          .catch((err) => console.log(err));
      })
      .then(() => {
        // On refresh le store AllUser
        axios({
          method: "get",
          url: `http://localhost:9000/api/collaborateurs`,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((res) => {
            dispatch(setAllUser(res.data));
          })
          .catch((err) => console.log(err));
      })
      // On vide les champs du formulaire en remetant le state local sur valeur initiale
      .then(() => {
        setCivility("");
        setCategory("");
        setLastname("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBirthdate("");
        setPhone("");
        setCity("");
        setCountry("");
        setPhoto("");
        document.querySelector(".validation").innerHTML =
          "Vos information ont été modifiés avec succés !";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {user && user.id && (
        <>
          <h1 style={{ textAlign: "center" }}>Modifier mon profil</h1>
          <div className="line"></div>
          <form action="" onSubmit={handleSubmit}>
            <p className="validation"></p>
            <div className="input-container">
              <label htmlFor="civility">* Civilité :</label>
              <select
                name="civility"
                id="civility"
                onChange={(e) => setCivility(e.target.value)}
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="category">* Catégorie :</label>
              <select
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Client">Client</option>
                <option value="Marketing">Marketing</option>
                <option value="Technique">Technique</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="lastname">* Nom :</label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="name">* Prénom :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">* Email :</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password-confirm">Confirmation :</label>
              <input
                type="password"
                id="password-confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="phone">Téléphone :</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="birthdate">* Date de naissance :</label>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                placeholder='<i className="fa-regular fa-calendar"></i>'
              />
            </div>
            <div className="input-container">
              <label htmlFor="city">* Ville :</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="country">* Pays :</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="photo">URL de la photo :</label>
              <input
                type="text"
                id="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            <input type="submit" className="form-btn" value="Modifier" />
          </form>
        </>
      )}
    </>
  );
};

export default EditProfile;
