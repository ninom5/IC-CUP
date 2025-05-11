import { useParams } from "react-router-dom";
import c from "./ProfilePage.module.css";
import { Role } from "enums";
import { useFetchUserProfile } from "@api/index";

export const ProfilePage = () => {
  const { id: userId } = useParams();
  const { data: profile, isLoading, error } = useFetchUserProfile(userId || "");
  //const { id: loggedInUserId, role } = useAuthUser();

  //const isOwnProfile = userId === loggedInUserId;
  const isOwnProfile = true; // TODO: Implement logic to check if the profile belongs to the logged-in user

  if (isLoading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri dohvaćanju profila.</p>;
  if (!profile) return <p>Korisnik nije pronađen.</p>;

  return (
    <div className={c.profileContainer}>
      <div className={c.tabs}>
        {isOwnProfile && (
          <>
            <button className={c.tab}>JAVNI PROFIL</button>
            <button className={c.tab}>POSTAVKE PROFILA</button>
          </>
        )}
      </div>

      <div className={c.section}>
        <img
          src={profile.personPhoto}
          alt="Profilna slika"
          className={c.avatar}
        />
        <h2>
          {profile.firstName} {profile.lastName}
        </h2>
        <h3>OPIS</h3>
        <p>
          {profile.description?.trim()
            ? profile.description
            : "Default tekst na početku"}
        </p>
      </div>

      {profile.role !== Role.USER && (
        <div className={c.section}>
          <h3>PONUĐENI AUTI</h3>
          {/* TODO: render vozila */}
        </div>
      )}

      <div className={c.section}>
        <h3>RECENZIJE OD GOSTIJU</h3>
        {/* TODO: render recenzija */}
      </div>
    </div>
  );
};
