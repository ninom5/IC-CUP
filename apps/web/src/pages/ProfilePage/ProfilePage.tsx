import { useNavigate, useParams } from "react-router-dom";
import c from "./ProfilePage.module.css";
import {
  useFetchUserProfile,
  useFetchUserVehicles,
  useGetUserRating,
  useGetUserReviews,
  useUpdateUser,
  useUploadImages,
} from "@api/index";
import { useToken } from "@hooks/index";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fallbackImageSvg, pencilSvg } from "@assets/images";
import { routes } from "@routes/routes";
import { ButtonAccent, ReviewCard, VehicleCard } from "@components/index";
import { ReviewCardData } from "types";

export const ProfilePage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useFetchUserProfile(userId || "");

  const { data: userRating, isLoading: isRatingLoading } = useGetUserRating(
    userId || ""
  );

  const { data: userVehicles, isLoading: isLoadingVehicles } =
    useFetchUserVehicles(userId || "");

  const { data: userReviews, isLoading: isLoadingReviews } = useGetUserReviews(
    userId || ""
  );

  const { data: tokenUser } = useToken();
  const isOwnProfile = !!tokenUser?.id && userId === tokenUser.id;

  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: uploadImages } = useUploadImages();

  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [personPhotoPreview, setPersonPhotoPreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (profile?.description) setDescription(profile.description);
    if (profile?.personPhoto) setPersonPhotoPreview(profile.personPhoto);
  }, [profile]);

  if (isLoading || isRatingLoading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri dohvaćanju profila.</p>;
  if (!profile) return <p>Korisnik nije pronađen.</p>;

  const handleSaveDescription = async () => {
    setIsSaving(true);
    await updateUser({ id: profile.id, description });
    refetch();
    setIsSaving(false);
  };

  const handlePersonPhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPersonPhotoPreview(URL.createObjectURL(file));

    try {
      const response = await uploadImages(file);
      if (!response?.secure_url) return;

      await updateUser({ id: profile.id, personPhoto: response.secure_url });
      refetch();
    } catch (err) {
      toast.error("Greška pri uploadu profilne slike.");
    }
  };

  return (
    <div className={c.profilePageContainer}>
      <div className={c.tabs}>
        {isOwnProfile ? (
          <>
            <button
              className={`${c.tab} ${activeTab === "profile" ? c.activeTab : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Moj profil
            </button>
            <button
              className={`${c.tab} ${activeTab === "settings" ? c.activeTab : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Postavke računa
            </button>
          </>
        ) : (
          <button className={`${c.tab} ${c.activeTab}`}>Profil</button>
        )}
      </div>

      {activeTab === "profile" && (
        <div className={c.profileContainer}>
          <div className={c.profileSection1}>
            <div className={c.profilePictureWrapper}>
              <img
                src={personPhotoPreview || fallbackImageSvg}
                alt="Profilna slika"
                className={c.avatar}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = fallbackImageSvg;
                }}
              />

              {isOwnProfile && (
                <>
                  <label htmlFor="upload-photo" className={c.editPhotoIcon}>
                    <img src={pencilSvg} alt="Uredi sliku" />
                  </label>
                  <input
                    type="file"
                    id="upload-photo"
                    className={c.hiddenInput}
                    onChange={handlePersonPhotoChange}
                  />
                </>
              )}
            </div>
            <div className={c.profileStatsWrapper}>
              <h1>
                {profile.firstName} {profile.lastName}
              </h1>
              {userRating && (
                <p className={c.rating}>
                  {userRating.averageRating.toFixed(1)} ★ (
                  {userRating.reviewCount})
                </p>
              )}
            </div>
          </div>

          <div className={c.profileSection2}>
            <div className={c.section}>
              <h2>Opis</h2>
              {isOwnProfile ? (
                <>
                  <textarea
                    className={c.textarea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <ButtonAccent
                    content={isSaving ? "Spremanje..." : "Spremi promjene"}
                    onClick={handleSaveDescription}
                    disabled={isSaving}
                  />
                </>
              ) : (
                <div className={c.textarea}>
                  {profile.description?.trim() ? profile.description : ""}
                </div>
              )}
            </div>

            <div className={c.section}>
              <div className={c.sectionHeader}>
                <h2>Automobili</h2>
                {isOwnProfile && (
                  <img
                    src={pencilSvg}
                    alt="Uredi popis"
                    onClick={() => navigate(routes.USER_VEHICLES)}
                    className={c.editVehicleListIcon}
                  />
                )}
              </div>

              {isLoadingVehicles ? (
                <p>Učitavanje vozila...</p>
              ) : userVehicles && userVehicles.length > 0 ? (
                <div className={c.vehiclesGrid}>
                  {userVehicles.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} variant="profile" />
                  ))}
                </div>
              ) : (
                <p>Nije dodano nijedno vozilo.</p>
              )}
            </div>

            <div className={c.section}>
              <h2>Recenzije od unajmljivača</h2>

              {isLoadingReviews ? (
                <p>Učitavanje recenzija...</p>
              ) : userReviews && userReviews.length > 0 ? (
                <div className={c.reviewList}>
                  {userReviews.map((review: ReviewCardData) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p>Korisnik još nema recenzija.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && isOwnProfile && (
        <>{/* SADRŽAJ ZA POSTAVKE */}</>
      )}
    </div>
  );
};
