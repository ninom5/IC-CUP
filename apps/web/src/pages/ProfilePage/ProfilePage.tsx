/*import { useParams } from "react-router-dom";
import c from "./ProfilePage.module.css";
import { Role } from "enums";*/

export const ProfilePage = () => {
  /*const { userId } = useParams();
  const { data: profile, isLoading, error } = useUserProfile(userId || "");
  const { id: loggedInUserId, role } = useAuthUser();

  const isOwnProfile = userId === loggedInUserId;

  if (isLoading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri dohvaćanju profila.</p>;
  if (!profile) return <p>Korisnik nije pronađen.</p>;*/

  return (
    <div>Profile page</div>
    /* <div className={c.profileContainer}>
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
        <p>{profile.description || "Default tekst na početku"}</p>
      </div>

      {profile.role !== Role.USER && (
        <div className={c.section}>
          <h3>PONUĐENI AUTI</h3>
          
        </div>
      )}

      <div className={c.section}>
        <h3>RECENZIJE OD GOSTIJU</h3>
        
      </div>
    </div> */
  );
};
