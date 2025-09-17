import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { Partner } from '../models/partner';
import { PageRequest } from 'src/app/shared/models/page-request';
import { filter } from 'rxjs';

/**
 * Service for handling CRUD operations related to partners.
 */
@Injectable({
  providedIn: 'root',
})
export class Partnerservice {
  /**
   * Constructor for injecting the HttpClient dependency.
   * @param http The HttpClient instance for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves a paginated list of partners from the backend API.
   * @param pageRequest An object containing pagination information such as page number, page size, etc.
   * @returns An Observable representing the HTTP response containing the list of partners.
   */
  getAllPartners(pageRequest: PageRequest) {
    return this.http.post(ApiRoutes.GET_ALL_API_PARTNERS, pageRequest);
  }

  /**
   * Adds a new partner to the backend API.
   * @param partner An object representing the partner to be added, containing partnerName and partnerImage.
   * @returns An Observable representing the HTTP response after adding the partner.
   */
  public addPartner(partner: Partner) {
    let formdata = new FormData();
    formdata.append('partnerName', partner.partnerName);
    formdata.append('partnerImage', partner.partnerImage);
    return this.http.post(ApiRoutes.ADD_PARTNER, formdata);
  }

  /**
   * Deletes a partner from the backend API based on the provided ID.
   * @param id The ID of the partner to be deleted.
   * @returns An Observable representing the HTTP response after deleting the partner.
   */
  public deletePartner(id: number) {
    return this.http.delete(ApiRoutes.DELETE_PARTNER + '?id=' + id);
  }

  /**
   * Updates an existing partner on the backend API.
   * @param partner An object representing the updated partner, containing partnerName, partnerImage, and id.
   * @returns An Observable representing the HTTP response after updating the partner.
   */
  public updatePartner(partner: Partner) {
    let formdata = new FormData();
    formdata.append('partnerName', partner.partnerName);
    if (partner.partnerImage instanceof File)
      formdata.append('partnerImage', partner.partnerImage);
    formdata.append('id', partner.id.toString());
    return this.http.put(ApiRoutes.UPDATE_PARTNER, formdata);
  }
}
